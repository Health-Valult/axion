// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'report.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class ReportAdapter extends TypeAdapter<Report> {
  @override
  final int typeId = 0;

  @override
  Report read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Report(
      id: fields[0] as String,
      dateTime: fields[1] as DateTime,
      code: fields[2] as String,
      display: fields[3] as String,
      encounter: fields[4] as String?,
      patient: fields[5] as String?,
      meta: (fields[6] as Map?)?.cast<String, dynamic>(),
      observations: (fields[7] as List?)
          ?.map((dynamic e) => (e as Map).cast<String, dynamic>())
          ?.toList(),
    );
  }

  @override
  void write(BinaryWriter writer, Report obj) {
    writer
      ..writeByte(8)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.dateTime)
      ..writeByte(2)
      ..write(obj.code)
      ..writeByte(3)
      ..write(obj.display)
      ..writeByte(4)
      ..write(obj.encounter)
      ..writeByte(5)
      ..write(obj.patient)
      ..writeByte(6)
      ..write(obj.meta)
      ..writeByte(7)
      ..write(obj.observations);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ReportAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Report _$ReportFromJson(Map<String, dynamic> json) => Report(
      id: json['id'] as String,
      dateTime: DateTime.parse(json['dateTime'] as String),
      code: json['code'] as String,
      display: json['display'] as String,
      encounter: json['encounter'] as String?,
      patient: json['patient'] as String?,
      meta: json['meta'] as Map<String, dynamic>?,
      observations: (json['observations'] as List<dynamic>?)
          ?.map((e) => e as Map<String, dynamic>)
          .toList(),
    );

Map<String, dynamic> _$ReportToJson(Report instance) => <String, dynamic>{
      'id': instance.id,
      'dateTime': instance.dateTime.toIso8601String(),
      'code': instance.code,
      'display': instance.display,
      'encounter': instance.encounter,
      'patient': instance.patient,
      'meta': instance.meta,
      'observations': instance.observations,
    };
