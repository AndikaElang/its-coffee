@component('mail::message')
@lang('YTH. Kandidat Pegawai RSUI')<br>
@lang('di Tempat') <br>

@lang('Kami dari SDM Rumah Sakit Universitas Indonesia'),

@if ($is_rejected)
  @lang('Mohon maaf, Setelah berbagai pertimbangan dan diskusi kami menyatakan bahwa Anda tidak lolos untuk lanjut ke tahap berikutnya.')<br>
@else
  @lang('Selamat! Anda berhasil lolos ke tahap selanjutnya dan status lamaran anda telah berubah menjadi')
  @component('mail::button', ['url' => $url])
  @lang($status)
  @endcomponent
@endif

@if ($notes)
  <b>Catatan:</b><br>
  {{ $notes }}
@endif

@lang('Salam'),<br>
@lang('SDM Rumah Sakit Universitas Indonesia')
@endcomponent