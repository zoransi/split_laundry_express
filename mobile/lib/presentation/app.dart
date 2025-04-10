import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';

class AppRoot extends StatelessWidget {
  const AppRoot({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // For now, just return the splash screen
    // In a real app, this would include proper navigation and state management
    return const SplashScreen();
  }
}
