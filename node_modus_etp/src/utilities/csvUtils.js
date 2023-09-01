
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const csvWriter = require('csv-write-stream');

const csvFilePath = path.join(__dirname, '../data/example.csv');

function readCSVData() {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function writeCSVData(data) {
  const writer = csvWriter({ headers: ['s.no', 'name', 'email', 'gender', 'age', 'city'] });
  const writableStream = fs.createWriteStream(csvFilePath);

  writer.pipe(writableStream);

  // Write the new data to the CSV file
  data.forEach((row) => writer.write(row));

  writer.end(); // Close the write stream
}



module.exports = { readCSVData, writeCSVData };
