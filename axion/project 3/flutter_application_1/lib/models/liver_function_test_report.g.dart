// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'liver_function_test_report.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class LiverFunctionTestReportAdapter
    extends TypeAdapter<LiverFunctionTestReport> {
  @override
  final int typeId = 7;

  @override
  LiverFunctionTestReport read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return LiverFunctionTestReport(
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
      bilirubinTotal: fields[11] as String,
      bilirubinDirect: fields[12] as String,
      bilirubinIndirect: fields[13] as String,
      sgpt: fields[14] as String,
      sgot: fields[15] as String,
      alkalinePhosphatase: fields[16] as String,
      serumProtein: fields[17] as String,
      serumAlbumin: fields[18] as String,
      globulin: fields[19] as String,
      agRatio: fields[20] as String,
    );
  }

  @override
  void write(BinaryWriter writer, LiverFunctionTestReport obj) {
    writer
      ..writeByte(21)
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
      ..write(obj.bilirubinTotal)
      ..writeByte(12)
      ..write(obj.bilirubinDirect)
      ..writeByte(13)
      ..write(obj.bilirubinIndirect)
      ..writeByte(14)
      ..write(obj.sgpt)
      ..writeByte(15)
      ..write(obj.sgot)
      ..writeByte(16)
      ..write(obj.alkalinePhosphatase)
      ..writeByte(17)
      ..write(obj.serumProtein)
      ..writeByte(18)
      ..write(obj.serumAlbumin)
      ..writeByte(19)
      ..write(obj.globulin)
      ..writeByte(20)
      ..write(obj.agRatio);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is LiverFunctionTestReportAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
