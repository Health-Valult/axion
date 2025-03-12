export interface ReportTemplateField {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    unit?: string;
  }
  
  export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    fields: ReportTemplateField[];
  }
  
  export const reportTemplates: ReportTemplate[] = [
    {
      id: "cbc",
      name: "Complete Blood Count (CBC)",
      description: "Measures the levels of red blood cells, white blood cells, and platelets in the blood",
      fields: [
        {
          id: "hemoglobin",
          label: "Hemoglobin",
          type: "number",
          placeholder: "14.0",
          required: true,
          unit: "g/dL"
        },
        {
          id: "wbc",
          label: "White Blood Cell Count",
          type: "number",
          placeholder: "7.5",
          required: true,
          unit: "x10^9/L"
        },
        {
          id: "rbc",
          label: "Red Blood Cell Count",
          type: "number",
          placeholder: "5.0",
          required: true,
          unit: "x10^12/L"
        },
        {
          id: "platelets",
          label: "Platelet Count",
          type: "number",
          placeholder: "250",
          required: true,
          unit: "x10^9/L"
        },
        {
          id: "hematocrit",
          label: "Hematocrit",
          type: "number",
          placeholder: "42",
          required: true,
          unit: "%"
        },
        {
          id: "mcv",
          label: "Mean Corpuscular Volume",
          type: "number",
          placeholder: "90",
          required: true,
          unit: "fL"
        }
      ]
    },
    // more templates attach......
  ]
  