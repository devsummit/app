package io.devsummit.app.android;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DevSummit";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Fabric.with(this, new Crashlytics());
    }
    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == MainApplication.PAY_PAL_REQUEST_ID) {
            MainApplication.getPaypalPackage().handleActivityResult(requestCode, resultCode, data); // <--
        }
    }
}
