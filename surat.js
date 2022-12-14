async function getDatasurat() {
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
        tempat: values[3].formattedValue,
        tanggallahir: values[4].formattedValue,
        jeniskelamin: values[5].formattedValue,
        agama: values[6].formattedValue,
        pendidikan: values[7].formattedValue,
        pekerjaan: values[8].formattedValue,
        alamat: values[9].formattedValue,
        telp: values[10].formattedValue,
        email: values[11].formattedValue,
        foto: String(values[12].formattedValue).replaceAll("open?", "uc?"),
      };
    });
  return data;
}

function dataItemTemplatesurat(item, n) {
  if (`${item.KTP}` == n) {
    return `
        <table style="margin-left: 50px; margin-right: 50px" class="w-100">
          <tr>
            <td style="width: 20%">No KTP</td>
            <td style="width: 1%">:</td>
            <td style="width: 45%">${item.KTP}</td>
            <td rowspan="5" style="width:35%"><img src="${item.foto}" style="height: 4cm"/></td>
          </tr>
          <tr>
            <td>Nama Lengkap</td>
            <td>:</td>
            <td>${item.nama}</td>
          </tr>
          <tr>
            <td>Tempat, Tanggal Lahir</td>
            <td>:</td>
            <td>${item.tempat}, ${item.tanggallahir}</td>
          </tr>
          <tr>
            <td>Jenis Kelamin</td>
            <td>:</td>
            <td>${item.jeniskelamin}</td>
          </tr>
          <tr>
            <td>Agama</td>
            <td>:</td>
            <td>${item.agama}</td>
          </tr>
          <tr>
            <td>Pendidikan Terakhir</td>
            <td>:</td>
            <td>${item.pendidikan}</td>
          </tr>
          <tr>
            <td>Pekerjaan</td>
            <td>:</td>
            <td>${item.pekerjaan}</td>
          </tr>
          <tr>
            <td style="vertical-align: top">Alamat Lengkap</td>
            <td style="vertical-align: top">:</td>
            <td>${item.alamat}</td>
          </tr>
          <tr>
            <td>No. Telp</td>
            <td>:</td>
            <td>${item.telp}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>${item.email}</td>
          </tr>
        </table>  
    `;
  }
}

async function renderSurat(n) {
  const wrapperDOM = document.getElementById("suratnama");
  try {
    const data = await getDatasurat(n);
    wrapperDOM.innerHTML = data
      .map((item) => dataItemTemplatesurat(item, n))
      .join("");
  } catch (error) {
    wrapperDOM.innerHTML = error;
  }
}

renderSurat();
