package io.devsummit.app.android;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.crashlytics.android.Crashlytics;
import com.github.javiersantos.appupdater.AppUpdater;
import com.github.javiersantos.appupdater.enums.Display;

import io.fabric.sdk.android.Fabric;


public class MainActivity extends ReactActivity {
    public static final int PERMISSION_REQ_CODE = 1234;
    public static final int OVERLAY_PERMISSION_REQ_CODE = 1235;
    public static final String TAG = MainActivity.class.getSimpleName();
    String[] perms = {
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE"
    };

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DevSummit";
    }

    // Permission results
    @Override
    public void onRequestPermissionsResult(int permsRequestCode, String[] permissions, int[] grantResults){
        switch(permsRequestCode){
            case PERMISSION_REQ_CODE:
                // example how to get result of permissions requests (there can be more then one permission dialog)
                // boolean readAccepted = grantResults[0]==PackageManager.PERMISSION_GRANTED;
                // boolean writeAccepted = grantResults[1]==PackageManager.PERMISSION_GRANTED;
                // checking permissions to prevent situation when user denied some permission
                checkPerms();
                break;

        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
        checkPerms();
        AppUpdater appUpdater = new AppUpdater(this);
        appUpdater.setDisplay(Display.DIALOG);
        appUpdater.start();

        Fabric.with(this, new Crashlytics());
    }
    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == MainApplication.PAY_PAL_REQUEST_ID) {
            MainApplication.getPaypalPackage().handleActivityResult(requestCode, resultCode, data); // <--
        }
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
            Log.d(TAG, "onActivityResult: " + requestCode + "" + resultCode);
        }
    }

    public void checkPerms() {
        Log.d(TAG, "checkPerms: triggered");
        Log.d(TAG, "checkPerms: " + Build.VERSION.SDK_INT);
        Log.d(TAG, "checkPerms: " + Build.VERSION_CODES.LOLLIPOP_MR1);
        // Checking if device version > 22 and we need to use new permission model
        if(Build.VERSION.SDK_INT>Build.VERSION_CODES.LOLLIPOP_MR1) {
            // Checking if we can draw window overlay
            if (!Settings.canDrawOverlays(this)) {
                // Requesting permission for window overlay(needed for all react-native apps)
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
            }
        }
    }
}
