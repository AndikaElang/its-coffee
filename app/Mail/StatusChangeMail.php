<?php

namespace App\Mail;

use App\Utilities\JobUtil;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StatusChangeMail extends Mailable
{
  use Queueable, SerializesModels;

  public $validated;
  public $url;

  /**
   * Create a new message instance.
   */
  public function __construct($validated, $url)
  {
    $this->validated = $validated;
    $this->url = $url;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Pengumuman Perubahan Status Lamaran ' . $this->validated['job_name'],
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      markdown: 'vendor.mail.statusChange',
      with: [
        'status' => JobUtil::mapReadableStatus($this->validated['status']),
        'notes' => $this->validated['notes'] ?? null,
        'is_rejected' => $this->validated['is_rejected'],
        'url' => $this->url
      ]
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
