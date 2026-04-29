const fs = require('fs');

const code = fs.readFileSync('src/pages/departments/ICTPage.jsx', 'utf-8');

const startIndex = code.indexOf('const response = [');
const endIndex = code.indexOf('const enabledSorted =');

if (startIndex !== -1 && endIndex !== -1) {
    const arrayStr = code.substring(startIndex, endIndex);
    
    // Replace const response = with export const sectionsConfig =
    const newFile = `
import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

export ${arrayStr.replace('const response =', 'const sectionsConfig =')}
`;
    
    fs.writeFileSync('src/Data/schools/ict.jsx', newFile);
    console.log("Successfully extracted to ict.jsx");
}
