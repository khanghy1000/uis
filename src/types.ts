export interface LoginResponse {
    access_token: string
}

export interface SinhVienInfoResponse {
    data: SinhVienInfo;
}

export interface SinhVienInfo {
    ten_day_du: string;
    ma_sv: string;
}

export interface GetDiemResponse {
    data: Data;
    result: boolean;
    code: number;
}

export interface Data {
    total_items: number;
    total_pages: number;
    is_kkbd: boolean;
    ds_diem_hocky: DsDiemHocky[];
    ds_field_an_cot_diem: any[];
    hien_thi_khoa_thi: boolean;
    hien_thi_cot_diem_tp: boolean;
    hien_thi_cot_diem_k1: boolean;
    hien_thi_cot_mhtt: boolean;
    hien_thi_cot_stctt: boolean;
    hien_thi_cot_diemtk10: boolean;
    hien_thi_cot_diemtk4: boolean;
    hien_thi_cot_diem_thi: boolean;
    hien_thi_cot_mh_nganh: boolean;
    mesage_diemtk4: string;
    mesage_diemtkc: string;
    mesage_diemtk10: string;
    mesage_diemk1: MesageDiemk1;
}

export interface DsDiemHocky {
    hoc_ky: string;
    ten_hoc_ky: string;
    so_tin_chi_dat_hk: string;
    so_tin_chi_dat_tich_luy: string;
    hien_thi_tk_he_10: boolean;
    hien_thi_tk_he_4: boolean;
    ds_diem_mon_hoc: DsDiemMonHoc[];
    loai_nganh?: number;
    dtb_hk_he10?: string;
    dtb_hk_he4?: string;
    dtb_tich_luy_he_10?: string;
    dtb_tich_luy_he_4?: string;
}

export interface DsDiemMonHoc {
    ma_mon: string;
    ma_mon_tt: string;
    nhom_to: string;
    ten_mon: string;
    mon_hoc_nganh: boolean;
    so_tin_chi: string;
    diem_thi?: string;
    diem_giua_ky: string;
    diem_tk: string;
    diem_tk_so: string;
    diem_tk_chu: string;
    ket_qua: number;
    hien_thi_ket_qua: boolean;
    loai_nganh: number;
    KhoaThi: number;
    khong_tinh_diem_tbtl: number;
    ly_do_khong_tinh_diem_tbtl: LyDoKhongTinhDiemTbtl;
    ds_diem_thanh_phan: DsDiemThanhPhan[];
}

export interface DsDiemThanhPhan {
    ky_hieu: KyHieu;
    ten_thanh_phan: MesageDiemk1;
    trong_so: string;
    diem_thanh_phan: string;
}

export enum KyHieu {
    B1 = 'B1',
    K1 = 'K1',
    K2 = 'K2',
    K3 = 'K3',
    T1 = 'T1',
    T2 = 'T2',
}

export enum MesageDiemk1 {
    BàiTập = 'Bài tập',
    ChuyênCần = 'Chuyên cần',
    KiểmTra = 'Kiểm tra',
    Thi = 'Thi',
    ThiLại = 'Thi lại',
    ThựcHành = 'Thực hành',
}

export enum LyDoKhongTinhDiemTbtl {
    Empty = '',
    MônCảiThiệnĐiểm = 'Môn cải thiện điểm',
    MônHọcLại = 'Môn học lại',
    MônHọcMônHọcCủaKhốiKhôngTínhĐiểmTrungBình = 'Môn học/ môn học của khối không tính điểm trung bình',
}
