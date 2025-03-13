export const Result = ({
    dsDiemHocKy,
    svInfo,
}: {
    dsDiemHocKy: any;
    svInfo: any;
}) => {
    return (
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Danh sách điểm</title>
                <style>
                    {`
                    td, th {
                        padding: 8px; 
                    }
                    `}
                </style>
            </head>
            <body>
                <h3>Họ tên: {svInfo.ten_day_du}</h3>
                <h3>MSSV: {svInfo.ma_sv}</h3>
                <hr />
                {dsDiemHocKy.map((hocKy: any) => (
                    <>
                        <h2>{hocKy.ten_hoc_ky}</h2>
                        <table border={1}>
                            <tr>
                                <th>Mã môn</th>
                                <th>Tên môn</th>
                                <th>Số tín chỉ</th>
                                <th>Điểm thi</th>
                                <th>Điểm giữa kỳ</th>
                                <th>Điểm TK (10)</th>
                                <th>Điểm TK (4)</th>
                                <th>Điểm TK (chữ)</th>
                                <th>Kết quả</th>
                                <th>Điểm thành phần</th>
                            </tr>
                            {hocKy.ds_diem_mon_hoc.map((monHoc: any) =>
                                MonHocRow(monHoc)
                            )}
                        </table>
                    </>
                ))}
            </body>
        </html>
    );
};

function MonHocRow(monHoc: any) {
    return (
        <tr>
            <td>{monHoc.ma_mon}</td>
            <td>{monHoc.ten_mon}</td>
            <td>{monHoc.so_tin_chi}</td>
            <td>{monHoc.diem_thi ?? ''}</td>
            <td>{monHoc.diem_giua_ky ?? ''}</td>
            <td>{monHoc.diem_tk ?? ''}</td>
            <td>{monHoc.diem_tk_so ?? ''}</td>
            <td>{monHoc.diem_tk_chu ?? ''}</td>
            <td>{monHoc.ket_qua ? 'Đạt' : 'Không đạt'}</td>
            <td style={{ textAlign: 'center' }}>
                {monHoc.ds_diem_thanh_phan &&
                    monHoc.ds_diem_thanh_phan.length > 0 && (
                        <>
                            <dialog id={monHoc.ma_mon}>
                                <h3>
                                    {monHoc.ma_mon} - {monHoc.ten_mon}
                                </h3>
                                {DiemThanhPhanTable(monHoc)}
                                <button
                                    style={{ marginTop: '20px' }}
                                    onclick={`document.getElementById('${monHoc.ma_mon}').close()`}
                                >
                                    Đóng
                                </button>
                            </dialog>
                            <button
                                style={{
                                    fontWeight: 'bold',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onclick={`document.getElementById('${monHoc.ma_mon}').showModal()`}
                            >
                                Chi tiết
                            </button>
                        </>
                    )}
            </td>
        </tr>
    );
}

function DiemThanhPhanTable(monHoc: any) {
    if (!monHoc.ds_diem_thanh_phan || monHoc.ds_diem_thanh_phan.length === 0) {
        return null;
    }

    return (
        <table border={1} style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>Thành phần</th>
                    <th>Trọng số</th>
                    <th>Điểm</th>
                </tr>
            </thead>
            <tbody>
                {monHoc.ds_diem_thanh_phan.map((tp: any) => (
                    <tr>
                        <td>{tp.ten_thanh_phan}</td>
                        <td>{tp.trong_so}</td>
                        <td>{tp.diem_thanh_phan}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
