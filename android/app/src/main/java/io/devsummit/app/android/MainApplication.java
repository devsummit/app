package io.devsummit.app.android;

import android.app.Application;
import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import com.farmisen.react_native_file_uploader.RCTFileUploaderPackage;
import com.imagepicker.ImagePickerPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import br.com.vizir.rn.paypal.PayPalPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import cl.json.RNSharePackage;
import io.fullstack.oauth.OAuthManagerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.microsoft.codepush.react.CodePush;

import io.devsummit.app.android.BuildConfig;
import io.devsummit.app.android.R;

import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  public static final int PAY_PAL_REQUEST_ID = 212223;
  public static PayPalPackage paypalPackage;

  public static PayPalPackage getPaypalPackage() {
    return paypalPackage;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }


    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      MainApplication.paypalPackage = new PayPalPackage(PAY_PAL_REQUEST_ID);
      return Arrays.asList(
          new MainReactPackage(),
            new RCTFileUploaderPackage(),
            new ImagePickerPackage(),
            new RNVersionNumberPackage(),
          new ReactNativeLocalizationPackage(),
              MainApplication.getPaypalPackage(),
          new VectorIconsPackage(),
          new RNSharePackage(),
          new OAuthManagerPackage(),
          new LinearGradientPackage(),
          new PickerPackage(),
          new FIRMessagingPackage(),
          new RNAccountKitPackage(),
          new ReactNativeDocumentPicker(),
          new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
  }
}
