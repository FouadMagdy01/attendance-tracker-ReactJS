import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const excel_to_json = (xlsxFile: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const file = xlsxFile;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        console.log("No data found in the uploaded file.");
        reject("No data found in the uploaded file.");
        return;
      }

      const headers: any = jsonData[0];
      const rows = jsonData.slice(1);

      const jsonDataArray = rows.map((row: any) => {
        const obj: any = {};
        headers.forEach((header: any, index: any) => {
          obj[header] = row[index];
        });
        return obj;
      });

      resolve(jsonDataArray);
    };

    reader.onerror = (e: any) => {
      reject("Error reading the file.");
    };

    reader.readAsArrayBuffer(file);
  });
};
