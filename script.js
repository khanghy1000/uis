#!/usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const readline = require('readline');

const loginUrl = 'https://uis.ptithcm.edu.vn/api/auth/login';
const getDsDiemUrl =
    'https://uis.ptithcm.edu.vn/api/srm/w-locdsdiemsinhvien?hien_thi_mon_theo_hkdk=false';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl._writeToOutput = (s) => {
    if (!rl.stdoutMuted) return rl.output.write(s);

    if (['\r\n', '\n', '\r'].includes(s)) return rl.output.write(s);

    const question = 'Enter password: ';
    const v = s.split(question);
    if (v.length == '2') {
        rl.output.write(question);
        rl.output.write('*'.repeat(v[1].length));
    } else {
        rl.output.write('*');
    }
};

rl.question('Enter username: ', (user) => {
    rl.question('Enter password: ', (pass) => {
        rl.stdoutMuted = false;
        rl.close();
        console.log();
        main(user, pass);
    });
    rl.stdoutMuted = true;
});

async function main(username, password) {
    try {
        const loginRes = await fetch(loginUrl, {
            method: 'POST',
            body: `username=${username}&password=${password}&grant_type=password`,
        });

        if (!loginRes.ok) {
            throw new Error('Login failed');
        }

        const loginData = await loginRes.json();
        const token = loginData.access_token;

        const dsDiemRes = await fetch(getDsDiemUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!dsDiemRes.ok) {
            throw new Error('Get ds diem failed');
        }

        const dsDiemData = await dsDiemRes.json();
        const htmlContent = generateHtml(dsDiemData.data.ds_diem_hocky);
        fs.writeFileSync('result.html', htmlContent);
        open('result.html');
    } catch (error) {
        console.error(error);
        return;
    }
}

function generateHtml(dsDiemHocKy) {
    let html =
        '<html><head><title>Danh sách điểm</title><style>td, th { padding: 8px; }</style></head><body>';
    dsDiemHocKy.forEach((hocKy) => {
        html += '<h2>' + hocKy.ten_hoc_ky + '</h2>';
        html += '<table border="1"><tr>';
        html += `
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
            `;

        html += '</tr>';
        hocKy.ds_diem_mon_hoc.forEach((monHoc) => {
            html += '<tr>';
            html += '<td>' + monHoc.ma_mon + '</td>';
            html += '<td>' + monHoc.ten_mon + '</td>';
            html += '<td>' + monHoc.so_tin_chi + '</td>';
            html += '<td>' + (monHoc.diem_thi ?? '') + '</td>';
            html += '<td>' + (monHoc.diem_giua_ky ?? '') + '</td>';
            html += '<td>' + (monHoc.diem_tk ?? '') + '</td>';
            html += '<td>' + (monHoc.diem_tk_so ?? '') + '</td>';
            html += '<td>' + (monHoc.diem_tk_chu ?? '') + '</td>';
            html += '<td>' + (monHoc.ket_qua ? 'Đạt' : 'Không đạt') + '</td>';
            html += '<td>';
            monHoc.ds_diem_thanh_phan.forEach((tp) => {
                html +=
                    tp.ten_thanh_phan +
                    ': ' +
                    tp.trong_so +
                    ', ' +
                    tp.diem_thanh_phan +
                    '<br>';
            });
            html += '</td>';
            html += '</tr>';
        });
        html += '</table>';
    });
    html += '</body></html>';
    return html;
}

function open(path) {
    let command = '';
    switch (process.platform) {
        case 'darwin':
            command = 'open';
            break;
        case 'win32':
            command = 'start ""';
            break;
        default:
            command = 'xdg-open';
            break;
    }
    child_process.execSync(`${command} "${path}"`);
}
