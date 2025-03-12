"use client"

import React from "react";
import { ReportTemplate } from "@/app/upload-report/data/reportTemplates";

interface GenericReportFieldsProps {
  reportTemplate: ReportTemplate;
}

const GenericReportFields: React.FC<GenericReportFieldsProps> = ({ reportTemplate }) => {
  return (
    <div className="space-y-4">
      {reportTemplate.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type}
            name={field.id}
            placeholder={field.placeholder}
            className="search-input"
            required={field.required}
          />
          {field.unit && (
            <span className="text-sm text-muted-foreground ml-2">{field.unit}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default GenericReportFields;
