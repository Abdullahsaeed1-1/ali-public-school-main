# alipublicschool.com.pk: domain takeover plan

Written 2026-10-22. Goal: move DNS control to our own Cloudflare account (the old
one belongs to Ata Gill, who is unreachable), fix Classter external email, then
launch the new main-branch website on Vercel. Nothing in here has been done yet.

## Situation (checked live on 2026-10-22)

- Registrar: **PKNIC**. We have this login (account `lubnaata`). Expiry 2028-02-02.
- Nameservers: `crystal.ns.cloudflare.com`, `matteo.ns.cloudflare.com`, which is
  **Ata Gill's Cloudflare account**. No login.
- Old WordPress site, cPanel and **school email** all run on one hosting server:
  **195.250.26.243** (`mysecurecloudhost` / cPanel). We don't have the hosting login yet.
- Classter (Inaam sir) sends external email through Mailgun on
  `mail.alipublicschool.com.pk`. It shows **Unverified** because its 3 DNS records
  are missing from the zone.

### Current DNS records (copy all of these into the new zone)

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | 195.250.26.243 | Proxied (orange) |
| A | `www` | 195.250.26.243 | Proxied |
| A | `mail` | 195.250.26.243 | **DNS only (grey)** |
| A | `webmail` | 195.250.26.243 | Proxied |
| A | `cpanel` | 195.250.26.243 | Proxied |
| A | `_dc-mx.33cf00f15bf8` | 195.250.26.243 | **DNS only (grey)** (email depends on it) |
| MX | `@` | `_dc-mx.33cf00f15bf8.alipublicschool.com.pk`, priority 10 | – |
| TXT | `@` | `v=spf1 +a +mx +ip4:185.181.252.170 include:spf.mysecurecloudhost.com +ip4:195.250.26.243 +ip4:15.204.162.181 +ip4:23.235.211.204 +include:smtp.servconfig.com +ip4:104.244.121.109 +ip4:192.145.239.35 ~all` | – |
| TXT | `_dmarc` | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2f/tNbmMdIv1gHmiBO3zn7YxQxFf7VT1k8yKJ9k5PDGSisAbQJWIiB6zCAhrb8X4/p+OqN3k0rjmF4sr6G/arLZtKRPk7JwyYieTUj+rH2iydwLMFyX2S59cQXzDNIh8qC1NngBEm+wrR1XrlXE3WRkyXvlGUdo3W6I7+8U/vUTtGTj91Ei/uKjYWMz6lr+hwDWYEgsZCGoLgU3iLa8ANpf1SYS/UihuQMqSSgas1UDiBwBW1Zrqd7wemKIN50zG0AVbWbggP99BKz3ZWWIJ8IX37YoBmIxBUxrgYNGOwEwR1LkTBmZe0gBay1aTWdFpPNQSJCkEfpdiOwUCpQFXFQIDAQAB;` | – |

Notes:
- The A records currently show Cloudflare IPs (104.21.x / 172.67.x / 188.114.x)
  because they are proxied. The real server is 195.250.26.243 (tested: `webmail`
  and `cpanel` answer from it, `mail` redirects to the site). If Cloudflare's import
  fills in Cloudflare IPs, **replace them with 195.250.26.243**.
- The `_dmarc` record actually holds a DKIM key (misconfigured by the old setup).
  Copy it as-is for now; fix it later from cPanel.
- These are only the records we could find from outside. If we get the cPanel login,
  compare with cPanel → Zone Editor before switching, since it is the full list.
- Don't copy the AAAA records (`2a06:98c1:...`); they belong to Cloudflare.

### Classter / Mailgun records (add in the new zone)

| Type | Name | Value | Proxy |
|---|---|---|---|
| TXT | `mail` | `v=spf1 include:mailgun.org ~all` | – |
| TXT | `k1._domainkey.mail` | Long `k=rsa; p=...` value; **copy as text from Classter**, never retype from a screenshot | – |
| CNAME | `email.mail` | `mailgun.org` | **DNS only (grey)** |

## Phase 0: Get these first (no risk)

1. **Old hosting login (cPanel) and who pays the hosting bill.** School email lives on
   that server. If the bill lapses, email and the old site both die. Ask Ali uncle.
2. **Classter DKIM value** as text from Inaam sir (Classter → Mailgun → DNS Records).
3. Pick the **email that will own the new Cloudflare account**: a school-owned
   address, with the login shared with Ali uncle, so this doesn't happen again.
4. For the website (later): Search Console access, WordPress backup (files + DB);
   see `SEO-MIGRATION-REVIEW.md`.

## Phase 1: New Cloudflare account (nothing changes for anyone yet)

1. Create the Cloudflare account (Free plan) and add the site `alipublicschool.com.pk`.
2. Let it import records, then make the zone match **both tables above** exactly,
   including the grey/orange settings.
3. SSL/TLS mode: **Full** (the old server's certificate may not pass strict checks).
4. Note the 2 nameservers Cloudflare assigns.
5. **Send screenshots of the DNS page to Claude before going to Phase 2.**

## Phase 2: Switch nameservers in PKNIC

1. PKNIC → My Domains → alipublicschool.com.pk → Nameservers → Edit, and enter the
   2 new Cloudflare nameservers. (Only this one domain is in the account, so editing
   the shared resource is safe. Don't touch Technical Contact or anything else.)
2. Wait until Cloudflare shows the site **Active**. `.pk` can take up to 24–48 hours.
   During this time some people hit the old zone and some the new one, which is why
   the records must match.
3. Test:
   - Old website opens on `alipublicschool.com.pk` and `www`
   - `webmail.alipublicschool.com.pk` opens; send **and** receive a test email to an
     `@alipublicschool.com.pk` address
   - Classter → **Check DNS Records** shows Verified; Inaam sir sends a test
     message to an external Gmail

## Phase 3: Launch the new website (separate day, after Phase 2 is stable)

Follow `SEO-MIGRATION-REVIEW.md` (backup, media mirror, Vercel preview, checks).
Then in Cloudflare change **only** `@` and `www` to point at Vercel (values from
Vercel's domain screen, DNS only/grey). **Leave `mail`, `webmail`, `cpanel`,
`_dc-mx...`, MX and TXT records alone**, because email still uses the old server.

## Phase 4: Move email off the old hosting (NOT optional, update 2026-10-24)

Ali uncle confirmed the old hosting bill was with Ata Gill, so it **cannot be renewed**
and will expire on an unknown date, taking school email (and the old site) with it.
- Find out which @alipublicschool.com.pk addresses are actually used, and by whom.
- Set up new email (e.g. Zoho Mail, like Premier) and then change MX/SPF in Cloudflare.
- Users export old mail through webmail/IMAP with their own passwords before expiry.
- Launch the new site on Vercel soon so the website doesn't depend on that hosting.
- Clean up the misplaced DKIM (`_dmarc`) and add a real DMARC record.

## Don't

- Don't press **Re-Assign** on Technical Contact in PKNIC.
- Don't press **Delete** on the Classter Mailgun page.
- Don't switch nameservers before the new zone has every record above.
- Don't cancel the old hosting.
