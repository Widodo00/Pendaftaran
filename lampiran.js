async function getDatalampiran() {
  const spreadsheetId = "1nSsnoWCuCv7FYG0qxE2qXXrsJLroWq2PueIsTPA-dbs";
  const apiKey = "AIzaSyCgoWjEtuS6CtVpsGb2tIsFqf2xJqepAVc";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${apiKey}&includeGridData=true`;
  const result = await fetch(url);
  const { sheets } = await result.json();
  const eventSheet = sheets[0];
  const data = eventSheet.data[0].rowData
    .filter((_, index) => index !== 0) // Mulai dari index 1 (menghindari nama kolom)
    .map((row) => {
      const { values } = row;
      return {
        KTP: values[1].formattedValue,
        fotoKTP: String(values[13].formattedValue).replaceAll("open?", "uc?"),
        fotoKK: String(values[14].formattedValue).replaceAll("open?", "uc?"),
      };
    });
  return data;
}

function dataItemTemplatelampiran(item, n) {
  if (`${item.KTP}` == n) {
    return `
            <p><img src="${item.fotoKTP}" style="height: 6cm"/></p>
            <p></p><img src="${item.fotoKK}" style="height: 21cm"/></p>
        `;
  }
}

async function renderlampiran(n) {
  const wrapperDOM = document.getElementById("lampiran");
  try {
    const data = await getDatalampiran();
    wrapperDOM.innerHTML = data
      .map((item) => dataItemTemplatelampiran(item, n))
      .join("");
  } catch (error) {
    wrapperDOM.innerHTML = error;
  }
}

renderlampiran();
