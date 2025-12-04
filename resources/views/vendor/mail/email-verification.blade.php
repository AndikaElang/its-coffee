@component('mail::message')
# @lang('Verifikasi Email Anda')

@lang('Data registrasi Anda telah berhasil kami terima. Verifikasi email Anda dengan mengklik tautan diawah ini:')

@component('mail::button', ['url' => $url])
@lang('Verifikasi Email')
@endcomponent

@lang("Atau Anda dapat klik URL berikut:<br>", ['url' => $url])
<span class="break-all">{{ $url }}</span>

@lang('Bila ada pertanyaan, silahkan email kami')
@component('mail::button', ['url' => 'mailto:recruitment@rs.ui.ac.id'])
@lang('Admisi Kami')
@endcomponent

@lang('Jika Anda tidak membuat akun, silahkan diabaikan.')

@lang('Salam'),<br>
{{ config('app.name') }}
@endcomponent
