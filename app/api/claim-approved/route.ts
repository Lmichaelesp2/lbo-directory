import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { contact_name, contact_email, org_name, org_city } = await req.json();

    if (!contact_email || !org_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sgMail.send({
      to: contact_email,
      from: {
        email: 'noreply@localbusinessorganizations.com',
        name: 'Local Business Organizations',
      },
      replyTo: 'hello@localbusinessorganizations.com',
      subject: `Welcome — ${org_name} is now a verified member`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a2332;">
          <div style="border-bottom: 2px solid #1a2332; padding-bottom: 16px; margin-bottom: 28px;">
            <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">Local Business Organizations</div>
            <div style="font-size: 20px; font-weight: 700; color: #1a2332;">Your listing has been approved ✓</div>
          </div>

          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 20px;">
            Hi ${contact_name || 'there'},
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 20px;">
            Great news — your claim for <strong>${org_name}</strong> has been approved. Your organization is now a verified member of the <strong>${org_city} chapter</strong> and the <strong>Texas Business Network</strong> — our statewide network of chambers, associations, and professional groups across Texas.
          </p>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #166534; margin-bottom: 12px;">Your membership includes</div>
            ${[
              `Verified listing on the Local Business Organizations directory`,
              `${org_city} city chapter membership`,
              `Texas Business Network statewide membership`,
              `Ability to update your organization's profile and contact information`,
              `Quarterly check-ins to keep your listing current`,
            ].map(item => `
              <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px;">
                <span style="color: #16a34a; font-size: 14px; flex-shrink: 0; margin-top: 1px;">✓</span>
                <span style="font-size: 13px; color: #166534; line-height: 1.5;">${item}</span>
              </div>
            `).join('')}
          </div>

          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 20px;">
            You can sign in to your account at any time to view your listing and update your organization's information. Keeping your contact details current helps other businesses and professionals connect with you accurately.
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="https://www.localbusinessorganizations.com/login" style="background: #1652f0; color: #fff; padding: 13px 28px; border-radius: 8px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">
              Sign in to your account →
            </a>
          </div>

          <p style="font-size: 14px; color: #64748b; line-height: 1.7;">
            Questions? Reply to this email or reach us at <a href="mailto:hello@localbusinessorganizations.com" style="color: #1652f0;">hello@localbusinessorganizations.com</a>.
          </p>

          <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 20px;">
            <div style="font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.6;">
              Local Business Organizations · Texas Business Directory<br/>
              <a href="https://www.localbusinessorganizations.com" style="color: #94a3b8;">localbusinessorganizations.com</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('claim-approved email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
