package io.devsummit.app.android.modules;

import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.os.Build;
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

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.Identifier;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;

import java.util.Collection;
import java.util.UUID;
import java.util.function.Consumer;

import io.devsummit.app.android.MainActivity;
import io.devsummit.app.android.Manifest;

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
            beaconManager.bind(activity);
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
                }
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("beaconsUpdate", beacons);
            }
        });
    }

    @Override
    public Context getApplicationContext() {
        return context;
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {

    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return false;
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
}
