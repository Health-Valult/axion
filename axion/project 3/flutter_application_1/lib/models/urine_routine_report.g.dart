// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'urine_routine_report.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class UrineRoutineReportAdapter extends TypeAdapter<UrineRoutineReport> {
  @override
  final int typeId = 13;

  @override
  UrineRoutineReport read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return UrineRoutineReport(
      id: fields[0] as String,
      dateTime: fields[1] as DateTime,
      title: fields[2] as String,
      status: fields[3] as String,
      placeholderImageUrl: fields[4] as String,
      patientName: fields[5] as String,
      referredBy: fields[6] as String,
      ageSex: fields[7] as String,
      investigations: fields[8] as String,
      dailyCaseNumber: fields[9] as String,
      patientID: fields[10] as String,
      physicalQuantity: fields[11] as String,
      physicalColour: fields[12] as String,
      physicalTransparency: fields[13] as String,
      specificGravity: fields[14] as String,
      pH: fields[15] as String,
      chemicalProtein: fields[16] as String,
      chemicalSugar: fields[17] as String,
      chemicalKetoneBodies: fields[18] as String,
      chemicalBilirubin: fields[19] as String,
      microscopicRBC: fields[20] as String,
      microscopicPusCells: fields[21] as String,
      microscopicEpithelialCells: fields[22] as String,
      microscopicCasts: fields[23] as String,
      microscopicCrystals: fields[24] as String,
      microscopicBacteria: fields[25] as String,
    );
  }

  @override
  void write(BinaryWriter writer, UrineRoutineReport obj) {
    writer
      ..writeByte(26)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.dateTime)
      ..writeByte(2)
      ..write(obj.title)
      ..writeByte(3)
      ..write(obj.status)
      ..writeByte(4)
      ..write(obj.placeholderImageUrl)
      ..writeByte(5)
      ..write(obj.patientName)
      ..writeByte(6)
      ..write(obj.referredBy)
      ..writeByte(7)
      ..write(obj.ageSex)
      ..writeByte(8)
      ..write(obj.investigations)
      ..writeByte(9)
      ..write(obj.dailyCaseNumber)
      ..writeByte(10)
      ..write(obj.patientID)
      ..writeByte(11)
      ..write(obj.physicalQuantity)
      ..writeByte(12)
      ..write(obj.physicalColour)
      ..writeByte(13)
      ..write(obj.physicalTransparency)
      ..writeByte(14)
      ..write(obj.specificGravity)
      ..writeByte(15)
      ..write(obj.pH)
      ..writeByte(16)
      ..write(obj.chemicalProtein)
      ..writeByte(17)
      ..write(obj.chemicalSugar)
      ..writeByte(18)
      ..write(obj.chemicalKetoneBodies)
      ..writeByte(19)
      ..write(obj.chemicalBilirubin)
      ..writeByte(20)
      ..write(obj.microscopicRBC)
      ..writeByte(21)
      ..write(obj.microscopicPusCells)
      ..writeByte(22)
      ..write(obj.microscopicEpithelialCells)
      ..writeByte(23)
      ..write(obj.microscopicCasts)
      ..writeByte(24)
      ..write(obj.microscopicCrystals)
      ..writeByte(25)
      ..write(obj.microscopicBacteria);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UrineRoutineReportAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
