package ai.niki.controller;

import com.pubnub.api.PNConfiguration;
import com.pubnub.api.enums.PNHeartbeatNotificationOptions;
import com.pubnub.api.enums.PNLogVerbosity;

public class testMainFile {
	public static void main(String[] args) {
		PNConfiguration pnConfiguration = new PNConfiguration();
		// subscribeKey from admin panel
		pnConfiguration.setSubscribeKey("SubscribeKey"); // required
		// publishKey from admin panel (only required if publishing)
		pnConfiguration.setPublishKey("PublishKey");
		// secretKey (only required for access operations, keep away from
		// Android)
		pnConfiguration.setSecretKey("SecretKey");
		// if cipherKey is passed, all communicatons to/from pubnub will be
		// encrypted
		pnConfiguration.setCipherKey("cipherKey");
		// UUID to be used as a device identifier, a default UUID is generated
		// if not passed
		pnConfiguration.setUuid("customUUID");
		// Enable Debugging
		pnConfiguration.setLogVerbosity(PNLogVerbosity.BODY);
		// if Access Manager is utilized, client will use this authKey in all
		// restricted
		// requests
		pnConfiguration.setAuthKey("authKey");
		// use SSL.
		pnConfiguration.setSecure(true);
		// how long to wait before giving up connection to client
		pnConfiguration.setConnectTimeout(100);
		// how long to keep the subscribe loop running before disconnect
		pnConfiguration.setSubscribeTimeout(310);
		// on non subscribe operations, how long to wait for server response
		pnConfiguration.setNonSubscribeRequestTimeout(300);
		// PSV2 feature to subscribe with a custom filter expression
		pnConfiguration.setFilterExpression("such=wow");
		// heartbeat notifications, by default, the SDK will alert on failed
		// heartbeats.
		// other options such as all heartbeats or no heartbeats are supported.
		pnConfiguration.setHeartbeatNotificationOptions(PNHeartbeatNotificationOptions.ALL);
		pnConfiguration.setPresenceTimeoutWithCustomInterval(120, 59);
		pnConfiguration.setPresenceTimeout(120);
	}
}
