import StructuralCard from '@/components/Card/StructuralCard';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

const supervisor = [
  {
    name: 'Dr. dr. Fathema Djan Rachmat, Sp.B, Sp,BTKV(K), MPH',
    title: 'supervisoryBoard.chairman',
    image: '/assets/media/struktural/dewas-ketua.jpg',
  },
  {
    name: 'Prof. Agus Setiawan, S.Kp., M.N., D.N.',
    title: 'supervisoryBoard.member',
    image: '/assets/media/struktural/dewas-anggota1.jpg',
  },
  {
    name: 'Prof. dr. Muchtaruddin Mansyur, M.S., PKK., PGDRM., Sp.OK., Ph.D',
    title: 'supervisoryBoard.member',
    image: '/assets/media/struktural/dewas-anggota2.jpg',
  },
  {
    name: 'Siti Fatimah Az Zahra, BE., S.KM., MBA., MM',
    title: 'supervisoryBoard.member',
    image: '/assets/media/struktural/dewas-anggota3.jpg',
  },
  {
    name: 'Ahmad Gamal, S.Ars., M.Si., M.U.P., Ph.D.',
    title: 'supervisoryBoard.member',
    image: '/assets/media/struktural/dewas-anggota4.jpg',
  },
];

const directors = [
  {
    name: 'dr. Kusuma Januarto, Sp.OG., Subsp.Obginsos',
    title: 'boardOfDirectors.chiefExecutive',
    image: '/assets/media/struktural/dirut-utama.jpg',
  },
  {
    name: 'Prof. Dr. dr. Rakhmad Hidayat, Sp.N., Subsp. NIIOO(K)., MARS',
    title: 'boardOfDirectors.medicalAndNursing',
    image: '/assets/media/struktural/dirut-pelayanan.jpg',
  },
  {
    name: 'dr. Tommy Dharmawan, Sp.B.T.KV., Ph.D.',
    title: 'boardOfDirectors.operational',
    image: '/assets/media/struktural/dirut-operasional.jpg',
  },
  {
    name: 'Dr. Novita Dwi Istanti, SKM, MARS, FISQua',
    title: 'boardOfDirectors.transformationAndBusiness',
    image: '/assets/media/struktural/dirut-transformasi.jpg',
  },
  {
    name: 'Erza Ruslan, S.Si., MBA',
    title: 'boardOfDirectors.financial',
    image: '/assets/media/struktural/dirut-keuangan.jpg',
  },
];

export default function Structural(props: PageProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: 'rsuiProfile' };

  return (
    <div className="py-12" id="struktural" style={{ scrollMarginTop: '120px' }}>
      <div className="container mx-auto max-xs:px-4">
        <div className={cn(homepageStyle.header)}>
          <div>
            <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">Struktural</h2>
          </div>
        </div>

        <StructuralCard {...props} ns="rsuiProfile" title={t('supervisoryBoard', t_opt)} data={supervisor} />
        <StructuralCard {...props} ns="rsuiProfile" title={t('boardOfDirectors', t_opt)} data={directors} />
      </div>
    </div>
  );
}
