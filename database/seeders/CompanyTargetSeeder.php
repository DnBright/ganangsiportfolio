<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompanyTarget;

class CompanyTargetSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['LPK HISKA', 'LPK (Pariwisata)', 'Rusgiyanta', 'lpkhiskajogja@gmail.com / 0818-0264-0404', 'Website', 'Draft', 'Ganang'],
            ['LPK BAYU UTAMA', 'LKP (Tata Busana)', 'Jumarni, S.Pd.', 'bayuutama.trainingcenter@gmail.com / 0813-2875-1615', 'Website', 'Aktif', 'Ganang'],
            ['LPK ATLANTIS OCEAN CLUB', 'LPK (Pelayaran)', 'Feny Revinasari', 'atlantis.oceanclub@gmail.com / 0822-4193-9883', 'Website', 'Aktif', 'Ganang'],
            ['LKP WARENG ESO', 'LKP (Pelatihan)', 'Nur Fadillah', 'warengeso60@gmail.com / 0853-2855-1191', 'Website', 'Draft', 'Ganang'],
            ['LKP NUSA INDAH', 'LKP (Pelatihan)', 'Pengelola', 'lkpnusaindah22@gmail.com / 0818-0272-1484', 'Website', 'Aktif', 'Ganang'],
            ['LKP LIDI', 'LKP (Pariwisata)', 'Irfan Yuly N.', 'fandabiwijaya24@gmail.com / 0853-9071-3040', 'Website', 'Draft', 'Ganang'],
            ['LPK MEANA GAKUSHU CENTER', 'LPK (Bahasa Jepang)', 'Admin', 'lpkmeana@gmail.com / 0898-6882-886', 'Website', 'Aktif', 'Ganang'],
            ['LKP BINA MANDIRI', 'LKP (Otomotif)', 'Pengelola', 'binamandiri_gk@yahoo.com / 0878-3922-xxxx', 'Website', 'Aktif', 'Ganang'],
            ['LKP MULTI KARYA', 'LKP (Komputer)', 'Maryanto', 'multikarya_gk@gmail.com / 0813-9265-4421', 'Website', 'Draft', 'Ganang'],
            ['LKP SINAR MENTARI', 'LKP (Kecantikan)', 'Admin', 'sinarmentari@gmail.com / 0877-3855-5532', 'Website', 'Aktif', 'Ganang'],
            ['LKP KHARISMA', 'LKP (Pelatihan)', 'Admin', 'lpk_kharisma@yahoo.com / 0817-5421-396', 'Website', 'Draft', 'Ganang'],
            ['LKP KURNIA', 'LKP (Tata Busana)', 'Ibu Kurnia', 'kurniamodegk@gmail.com / 0819-0414-0450', 'Website', 'Aktif', 'Ganang'],
            ['LKP MITRA ILMU', 'LKP (Komputer)', 'Bp. Heri', 'mitrailmu.gk@gmail.com / 0878-3922-1200', 'Website', 'Draft', 'Ganang'],
            ['LKP PUSPA', 'LKP (Menjahit)', 'Ibu Puspa', 'lpk_puspa@gmail.com / 0812-2733-4412', 'Website', 'Aktif', 'Ganang'],
        ];

        foreach ($data as $item) {
            // Split email and contact
            $contacts = explode(' / ', $item[3]);
            $email = trim($contacts[0] ?? '');
            $whatsapp = trim($contacts[1] ?? '');

            CompanyTarget::create([
                'company_name' => $item[0],
                'industry' => $item[1],
                'contact_person' => $item[2],
                'email' => $email,
                'whatsapp_contact' => $whatsapp,
                'project_type' => $item[4],
                'proposal_status' => $item[5],
                'admin_in_charge' => $item[6],
            ]);
        }
    }
}
