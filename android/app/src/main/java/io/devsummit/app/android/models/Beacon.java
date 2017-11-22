package io.devsummit.app.android.models;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;
import java.util.List;


/**
 * Created by gufy on 22/11/17.
 */

public class Beacon {
    int rssi;
    String uuid;
    Double accuracy;
    private int proximity;
    private int major;
    private int minor;
    public Beacon() {

    }

    public Beacon(org.altbeacon.beacon.Beacon beacon) {
        this.uuid = beacon.getId1().toUuid().toString();
        this.accuracy = beacon.getDistance();
        this.proximity = beacon.getTxPower();
        this.major = beacon.getId2().toInt();
        this.minor = beacon.getId3().toInt();
        this.rssi = beacon.getRssi();
    }
}
