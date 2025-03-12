import { Hono } from 'hono';
import { Result } from './Result';
import { Homepage } from './Homepage';

const app = new Hono();

const loginUrl = 'https://uis.ptithcm.edu.vn/api/auth/login';
const getDsDiemUrl =
    'https://uis.ptithcm.edu.vn/api/srm/w-locdsdiemsinhvien?hien_thi_mon_theo_hkdk=false';

app.get('/', (c) => {
    return c.html(<Homepage error={null}/>);
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
        return c.html(<Result dsDiemHocKy={dsDiemData.data.ds_diem_hocky} />);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return c.html(<Homepage error={error.message} />);
        }
    }
});

export default app;
