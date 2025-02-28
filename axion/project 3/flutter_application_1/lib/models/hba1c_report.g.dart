// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hba1c_report.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class HBA1cReportAdapter extends TypeAdapter<HBA1cReport> {
  @override
  final int typeId = 4;

  @override
  HBA1cReport read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return HBA1cReport(
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
      hba1cValue: fields[11] as String,
      unit: fields[12] as String,
      reference: fields[13] as String,
    );
  }

  @override
  void write(BinaryWriter writer, HBA1cReport obj) {
    writer
      ..writeByte(14)
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
      ..write(obj.hba1cValue)
      ..writeByte(12)
      ..write(obj.unit)
      ..writeByte(13)
      ..write(obj.reference);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is HBA1cReportAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
