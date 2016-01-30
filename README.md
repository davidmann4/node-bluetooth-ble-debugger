# bluebuy-node-client
![image](https://cloud.githubusercontent.com/assets/1736570/12698258/7bba3f70-c798-11e5-9b4f-35c71b4c6868.png)


### Linux

 * Kernel version 3.6 or above
 * ```libbluetooth-dev```

#### Ubuntu/Debian/Raspbian

```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

### Run the Script
```sh
NOBLE_HCI_DEVICE_ID=1 sudo node ble-uart-debug.js 
```
