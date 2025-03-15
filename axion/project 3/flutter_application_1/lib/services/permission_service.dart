import 'package:permission_handler/permission_handler.dart';

class PermissionService {
  static Future<void> requestAllPermissions() async {
    // First request location permission specifically
    var locationStatus = await Permission.location.request();
    if (locationStatus.isDenied || locationStatus.isPermanentlyDenied) {
      print('Warning: Location permission is required for proper app functionality');
      await openAppSettings();
      return;
    }

    // Then request other permissions
    Map<Permission, PermissionStatus> statuses = await [
      Permission.camera,
      Permission.storage,
      Permission.notification,
    ].request();

    // Handle each permission status
    statuses.forEach((permission, status) {
      if (status.isDenied) {
        _handleDeniedPermission(permission);
      }
    });
  }

  static void _handleDeniedPermission(Permission permission) {
    String permissionName = permission.toString().split('.').last;
    print('Warning: $permissionName permission was denied');
    // You can implement custom handling for denied permissions here
    // For example, showing a dialog explaining why the permission is needed
  }

  // Check if all required permissions are granted
  static Future<bool> checkAllPermissions() async {
    bool locationGranted = await Permission.location.isGranted;
    if (!locationGranted) {
      print('Location permission not granted, requesting now...');
      var status = await Permission.location.request();
      locationGranted = status.isGranted;
    }

    bool cameraGranted = await Permission.camera.isGranted;
    bool storageGranted = await Permission.storage.isGranted;
    bool notificationGranted = await Permission.notification.isGranted;

    return locationGranted && 
           cameraGranted && 
           storageGranted && 
           notificationGranted;
  }
}
