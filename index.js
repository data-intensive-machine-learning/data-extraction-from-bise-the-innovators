const axios = require('axios')
const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); //Instantiate var
var csvFilename = "data.csv";


async function run(){


  function jsonToCsv(items) {
    const header = Object.keys(items[0]);
    const headerString = header.join(',');
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');

    fs.appendFileSync('data.csv', csv)
    console.log('new data added to file!')
  }



  for (let i = 595369; i < 595467; i++) {
    const aa = await axios.post(
      'https://hsscresult.ajkbise.net/HSSC-II/ajax_data.php',
      `rollno=${i}`
  )

  if(aa.data.Results.GROUP_NAME === null){
    console.log(`Data is not present on roll number ${i} skipping`)
  } else {
    console.log('Adding result data to file, roll number is ' + i)
    jsonToCsv([aa.data.Results])
  }

  }



   


    // csvWriter({sendHeaders: false});
    // console.log(
    //   aa.data.Results.GROUP_NAME === null ? 'Nai pra kuch bhi' : aa.data.Results
    //  )
    // writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
    // writer.write({
    //   header1: aa.data.Results
    // });


   

//             const aa2 = await axios.post(
//                 'https://hsscresult.ajkbise.net/HSSC-II/ajax_data.php',
//                 'rollno=100023'
//             )

//  console.log(
//   aa2.data.Results.GROUP_NAME === null ? 'Nai pra kuch bhi' : aa2.data.Results
//  )

//             csvWriter({sendHeaders: false});
//             writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
//             writer.write({
//               header1: aa2.data.Results.GROUP_NAME,
//               header2: aa2.data.Results.NAME,
//               header3: aa2.data.Results.FNAME
//             });

    
//     console.log('Done!')
}

run()