import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'presentation/app.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const SplitLaundryApp());
}

class SplitLaundryApp extends StatelessWidget {
  const SplitLaundryApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Split Laundry Express',
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      home: const AppRoot(),
    );
  }
}
