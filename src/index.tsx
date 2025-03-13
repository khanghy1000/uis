import { Hono } from 'hono';
import { Result } from './Result';
import { Homepage } from './Homepage';

const app = new Hono();

const baseUrl = 'https://uis.ptithcm.edu.vn';
const loginUrl = baseUrl + '/api/auth/login';
const getDsDiemUrl =
    baseUrl + '/api/srm/w-locdsdiemsinhvien?hien_thi_mon_theo_hkdk=false';
const svInfoUrl = baseUrl + '/api/dkmh/w-locsinhvieninfo';

app.get('/', (c) => {
    const error = c.req.query('error');
    return c.html(<Homepage error={error} />);
});

app.post('/diem', async (c) => {
    const formData = await c.req.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const loginRes = await fetch(loginUrl, {
            method: 'POST',
            body: `username=${username}&password=${password}&grant_type=password`,
        });

        if (!loginRes.ok) {
            throw new Error('Login failed');
        }

        const loginData: any = await loginRes.json();
        const token = loginData.access_token;

        const svInfoRes = await fetch(svInfoUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!svInfoRes.ok) {
            throw new Error('Get sv info failed');
        }

        const svInfoData: any = await svInfoRes.json();

        const dsDiemRes = await fetch(getDsDiemUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!dsDiemRes.ok) {
            throw new Error('Get ds diem failed');
        }

        const dsDiemData: any = await dsDiemRes.json();
        return c.html(
            <Result
                svInfo={svInfoData.data}
                dsDiemHocKy={dsDiemData.data.ds_diem_hocky}
            />
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return c.redirect('/?error=' + error.message);
        }
    }
});

export default app;
