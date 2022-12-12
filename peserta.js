async function getData() {
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
        Nama: values[2].formattedValue,
      };
    });
  return data;
}

function dataItemTemplate(item) {
  return `<tr>
        <td style="padding-left: 1cm; border: 1px solid black">${item.KTP}</td>
        <td style="padding-left: 1cm; border: 1px solid black">${item.Nama}</td>
        <td style="border: 1px solid black"><center><button type="button" class="btn btn-primary" value="true" onclick="tampil(1);renderSurat(${item.KTP});renderttd(${item.KTP});renderlampiran(${item.KTP})">Lihat Surat</button>
        <button type="button" class="btn btn-success" onclick="cetak('surat')" value="cetak">Cetak</button></center></td>
      <tr/>`;
}

async function renderData() {
  const wrapperDOM = document.getElementById("peserta");
  try {
    const data = await getData();
    wrapperDOM.innerHTML =
      "<tr><th style='border: 1px solid black'><center>No. KTP</center></th>" +
      "<th style='border: 1px solid black'><center>Nama Lengkap</center></th>" +
      "<th style='border: 1px solid black'><center>Aksi</center></th></tr>" +
      data.map((item) => dataItemTemplate(item)).join("");
  } catch (error) {
    wrapperDOM.innerHTML = error;
  }
}

renderData();
