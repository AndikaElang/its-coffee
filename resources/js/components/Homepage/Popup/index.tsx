import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PageProps } from '@/types';
import { SpecialOffer } from '@/types/models';
import { VisuallyHidden } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

export default function Popup(props: PageProps & { ns: string; specialOffer: SpecialOffer }) {
  const [opened, { open, close }] = useDisclosure(true);
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };
  const data = props.specialOffer;

  return (
    <Dialog
      open={opened}
      onOpenChange={(stateOpened) => {
        if (stateOpened) open();
        else close();
      }}
    >
      <VisuallyHidden>
        <DialogTitle>Promo Popup</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="p-0 w-[80%] md:w-[100%]">
        <ImageWithLoading src={data.file_name} alt={data.judul ? data.judul : ''} className={'mx-auto'} />
        {/* Central Overlay Button */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-16 pb-6">
          <div className="flex justify-center">
            <a href={data.link ? data.link : '/'} target="__blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transform hover:scale-102 transition-all duration-200 text-lg"
              >
                Cek Sekarang
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
