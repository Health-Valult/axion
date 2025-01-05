import 'package:flutter/material.dart';

class ProgressBar extends StatelessWidget {
  final int currentStep; // Current step (1, 2, or 3)

  const ProgressBar({
    Key? key,
    required this.currentStep,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // First Step
        _buildStep(
          isActive: currentStep >= 1,
          gradient: const LinearGradient(
            colors: [Colors.blue, Colors.lightBlueAccent],
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
        ),
        _buildLine(isActive: currentStep >= 2),

        // Second Step
        _buildStep(
          isActive: currentStep >= 2,
          gradient: const LinearGradient(
            colors: [Colors.lightBlueAccent, Colors.cyan],
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
        ),
        _buildLine(isActive: currentStep >= 3),

        // Third Step
        _buildStep(
          isActive: currentStep >= 3,
          gradient: const LinearGradient(
            colors: [Colors.cyan, Colors.cyanAccent],
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
        ),
      ],
    );
  }

  /// Build each step as a rounded rectangle with gradient,
  /// now wrapped in AnimatedContainer for a smooth transition.
  Widget _buildStep({required bool isActive, required Gradient gradient}) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 400),
      curve: Curves.easeInOut,
      width: 32,
      height: 16,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: isActive
            ? gradient
            : const LinearGradient(
                colors: [Colors.grey, Colors.grey],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              ),
      ),
    );
  }

  /// Build connecting lines with gradient,
  /// also wrapped in AnimatedContainer for the animation.
  Widget _buildLine({required bool isActive}) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 400),
      curve: Curves.easeInOut,
      width: 60,
      height: 4,
      decoration: BoxDecoration(
        gradient: isActive
            ? const LinearGradient(
                colors: [Colors.lightBlueAccent, Colors.cyan],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              )
            : const LinearGradient(
                colors: [Colors.grey, Colors.grey],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              ),
      ),
    );
  }
}
