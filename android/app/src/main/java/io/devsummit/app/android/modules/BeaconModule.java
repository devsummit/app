package io.devsummit.app.android.modules;

import android.app.ActivityManager;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Parcelable;
import android.os.RemoteException;
import android.util.Log;

import com.facebook.react.bridge.BaseJavaModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.PermissionListener;
import com.google.gson.Gson;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Identifier;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

import io.devsummit.app.android.MainActivity;
import io.devsummit.app.android.Manifest;
import io.devsummit.app.android.services.BeaconService;

/**
 * Created by gufy on 13/11/17.
 */

public class BeaconModule extends BaseJavaModule implements NativeModule, BeaconConsumer, PermissionListener {
    private final String TAG = BeaconModule.class.getSimpleName();
    private final String CUBEACON_ID = "EBEFD083-70A2-47C8-9837-E7B5634DF524";
    private ReactApplicationContext context;
    private BeaconManager beaconManager;
    private Region beaconRegion;
    private Promise connectPromise;
    public BeaconModule(ReactApplicationContext context) {
        this.context = context;
        beaconManager = BeaconManager.getInstanceForApplication(context);
        beaconManager.getBeaconParsers().clear();
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25"));
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24"));
        beaconManager.getBeaconParsers().add(new BeaconParser().
                setBeaconLayout("s:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19"));
        beaconRegion = new Region("devsummit", Identifier.fromUuid(UUID.fromString(CUBEACON_ID)), null, null);
    }

    @Override
    public String getName() {
        return "BeaconModule";
    }

    @ReactMethod
    public void startConnect(Promise connectPromise) {
        this.connectPromise = connectPromise;
        MainActivity activity = (MainActivity) context.getCurrentActivity();
        if (activity != null) {
            beaconManager.bind(this);
            activity.authorizeForBeacon(this, this);
        }
    }

    @Override
    public void initialize() {

    }

    @Override
    public boolean canOverrideExistingModule() {
        return false;
    }

    @Override
    public void onCatalystInstanceDestroy() {

    }

    @Override
    public void onBeaconServiceConnect() {
        connectPromise.resolve("authorized");
        beaconManager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Log.d(TAG, "didEnterRegion: region"+ region.getId1().toUuid().toString());
                try {
                    beaconManager.startRangingBeaconsInRegion(region);
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void didExitRegion(Region region) {

            }

            @Override
            public void didDetermineStateForRegion(int i, Region region) {

            }
        });
        beaconManager.addRangeNotifier(new RangeNotifier() {
            @Override
            public void didRangeBeaconsInRegion(Collection<Beacon> collection, Region region) {
                WritableArray beacons = new WritableNativeArray();
                if (collection.size() == 0) return;
                Intent serviceIntent = new Intent(context, BeaconService.class);
                List<io.devsummit.app.android.models.Beacon> beaconList = new ArrayList();
                for (Beacon beacon :
                        collection) {
                    WritableMap beaconMap = new WritableNativeMap();
                    beaconMap.putString("uuid", beacon.getId1().toUuid().toString());
                    beaconMap.putDouble("accuracy", beacon.getDistance());
                    beaconMap.putInt("proximity", beacon.getTxPower());
                    beaconMap.putInt("major", beacon.getId2().toInt());
                    beaconMap.putInt("minor", beacon.getId3().toInt());
                    beaconMap.putInt("rssi", beacon.getRssi());
                    beacons.pushMap(beaconMap);
                    beaconList.add(new io.devsummit.app.android.models.Beacon(beacon));
                }
                String json = new Gson().toJson(beaconList);
                if(isAppOnForeground(context)) {
                    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("beaconsUpdate", beacons);
                } else {
                    serviceIntent.putExtra("beacon", json);
                    context.startService(serviceIntent);
                }
            }
        });
    }

    @Override
    public Context getApplicationContext() {
        return context.getApplicationContext();
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {
        context.getApplicationContext().unbindService(serviceConnection);
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return context.getApplicationContext().bindService(intent, serviceConnection, i);
    }

    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (mBluetoothAdapter == null) {
            // Device does not support Bluetooth
            connectPromise.reject("500", "unauthorized");
            return false;
        } else {
            if (!mBluetoothAdapter.isEnabled()) {
                // Bluetooth is not enable :)
                connectPromise.reject("500", "bluetooth disabled");
                return false;
            }
        }
        try {
            Log.d(TAG, "onRequestPermissionsResult: i should be triggered");
            beaconManager.startMonitoringBeaconsInRegion(beaconRegion);
            beaconManager.startRangingBeaconsInRegion(beaconRegion);
        } catch (RemoteException e) {
            e.printStackTrace();
            connectPromise.reject(e);
        }
        return true;
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }
}
