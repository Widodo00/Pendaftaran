async function getDatattd() {
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
        nama: values[2].formattedValue,
        tanggalttd: values[22].formattedValue,
        fotottd: String(values[15].formattedValue).replaceAll("open", "uc"),
      };
    });
  return data;
}

function dataItemTemplatettd(item, n) {
  if (`${item.KTP}` == n) {
    return `
        <p>Jakarta, ${item.tanggalttd}</p>
        <p>Yang menyatakan,</p>
        <p><img src="${item.fotottd}" style="height: 3cm"/></p>
        <p>(${item.nama})</p>
      `;
  }
}

async function renderttd(n) {
  const wrapperDOM = document.getElementById("ttd");
  try {
    const data = await getDatattd(n);
    wrapperDOM.innerHTML = data
      .map((item) => dataItemTemplatettd(item, n))
      .join("");
  } catch (error) {
    wrapperDOM.innerHTML = error;
  }
}

renderttd();
