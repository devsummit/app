//
//  BeaconModule.h
//  app
//
//  Created by Mochamad Gufron on 13/11/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef BeaconModule_h
#define BeaconModule_h
#import <CoreLocation/CoreLocation.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface BeaconModule: RCTEventEmitter<RCTBridgeModule, CLLocationManagerDelegate>
@property NSArray<CLBeacon *> *beacons;
@property CLLocationManager *locationManager;
@property CLBeaconRegion *beaconRegion;
- (void) connect;
@end

#endif /* BeaconModule_h */
