export const Result = ({ dsDiemHocKy }: { dsDiemHocKy: any }) => {
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
                                <th>Điểm tk</th>
                                <th>Điểm tk số</th>
                                <th>Điểm tk chữ</th>
                                <th>Kết quả</th>
                                <th>Trọng số, điểm</th>
                            </tr>
                            {hocKy.ds_diem_mon_hoc.map((monHoc: any) => (
                                <tr>
                                    <td>{monHoc.ma_mon}</td>
                                    <td>{monHoc.ten_mon}</td>
                                    <td>{monHoc.so_tin_chi}</td>
                                    <td>{monHoc.diem_thi ?? ''}</td>
                                    <td>{monHoc.diem_giua_ky ?? ''}</td>
                                    <td>{monHoc.diem_tk ?? ''}</td>
                                    <td>{monHoc.diem_tk_so ?? ''}</td>
                                    <td>{monHoc.diem_tk_chu ?? ''}</td>
                                    <td>
                                        {monHoc.ket_qua ? 'Đạt' : 'Không đạt'}
                                    </td>
                                    <td>
                                        {monHoc.ds_diem_thanh_phan.map(
                                            (tp: any) => (
                                                <>
                                                    {tp.ten_thanh_phan}
                                                    {': '}
                                                    {tp.trong_so}
                                                    {', '}
                                                    {tp.diem_thanh_phan}
                                                    <br />
                                                </>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </>
                ))}
            </body>
        </html>
    );
};
