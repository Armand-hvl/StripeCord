# **The Ultimate Discord Bot for Seamless Subscription Management with Stripe!**

StripeCord is a simple, free solution to seamlessly integrate Stripe and Discord. It connects directly to the Stripe API, with no extra fees involved. Your customers just enter the email they used for their Stripe subscription through a Discord command and get instant access. From **v3** onward, the bot can react to Stripe **webhooks** in real time, granting and revoking roles the moment a subscription changes — with an optional periodic check as a safe guard.

## ✨ Features

- 🔗 **Self-service linking** — members link their Stripe email via a slash command or a one-click button.
- ⚡ **Instant webhook sync** — roles update the moment a subscription is created, renewed, canceled, or fails to pay.
- 🛡️ **Cron safe guard** — keep the classic periodic full-database check running alongside webhooks (or on its own).
- 🎭 **Multi-plan roles** — map each Stripe price/plan to its own Discord role, or run in single-role legacy mode.
- 🧹 **Self-healing** — safety check removes roles from unauthorized holders; inactivity check prunes stale entries.
- 🗄️ **MongoDB-backed** — connects directly to the Stripe API, no middleman, no extra fees.

## StripeCord v3 is now available!

StripeCord v3 introduces **Stripe webhooks** for instant role updates: instead of waiting for the periodic cron check, roles are synced the moment a subscription changes on Stripe — faster for your members and far fewer API requests. The legacy cron check is still available and can run alongside webhooks as a safe guard.

If anyone would like to help, I would be grateful if you could make PRs or create a issue for enhancement features or bugs found. Any [Ko-Fis](https://ko-fi.com/rodaviva) given would be greatly welcome to allow me to continue to mantain this project development.

### Sync modes (`SYNC_MODE`)

Choose how subscription changes reach Discord roles via the `SYNC_MODE` environment variable:

| Mode | Behaviour |
|------|-----------|
| `webhook` | Instant updates driven by Stripe events only. No periodic cron. |
| `cron` | Legacy v2 behaviour: full database sweep every `CHECK_HOURS`. |
| `both` | **Recommended.** Webhooks for instant updates **+** cron as a safe guard. |

### Webhook setup

1. Set `SYNC_MODE` to `webhook` or `both`.
2. In your Stripe Dashboard go to **Developers > Webhooks**, add an endpoint pointing to `http(s)://<your-host>:<WEBHOOK_PORT>/webhook`.
3. Subscribe the endpoint to the `customer.subscription.*` and `invoice.*` events.
4. Copy the endpoint's **signing secret** (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`.
5. Set `WEBHOOK_PORT` (default `3000`) and make sure it is reachable from Stripe (directly or behind a reverse proxy / tunnel).

> Webhooks only act on customers already linked in the database. New members must run `/link` once; from then on their roles update automatically.

> [!NOTE]
> **Hosting:** webhook mode needs an inbound HTTP port reachable by Stripe. On platforms that only expose bots without a public port (e.g. Discloud's `bot` type), either expose `WEBHOOK_PORT` / use a tunnel, or run `SYNC_MODE="cron"`. A `/health` endpoint is available for uptime checks.

---

## 🤝 Sponsor [Subscord](https://subscord.com/?ref=stripecord)

StripeCord is an open-source Discord bot that lets you sell memberships and roles using **Stripe**. While the bot is free and open-source, hosting, configuring, and managing subscriptions can be challenging for beginners. Since I receive a lot of questions that I can’t always answer individually, I recommend using [Subscord](https://subscord.com/?ref=stripecord) — a full-featured service that lets you turn your community into a paid one in just a few clicks, with low fees and automated role management.

## Wiki / Documentation

Please check the [Wiki / Docs](https://github.com/Rodaviva29/StripeCord/wiki) to get started with this project and to see all the awesome features.

⭐ **Cloud Hosted Free configuration available** within minutes and Self Hosted configuration for the geeks.

## Acknowledgements

> Core concept inspired by [Androz2091/stripe-discord-bot](https://github.com/Androz2091/stripe-discord-bot).
This version uses JavaScript instead of TypeScript and noSQL (MongoDB) instead of SQL.

_This project is licensed under the MIT License - check the [LICENSE.md](LICENSE.md) file for details._

---

We hope you enjoy using Stripe Cord. If you have any questions or issues, feel free to contact me on Discord (prefereble) or via chat in https://chung-jf.me. My Discord nickname is `Rodaviva`.

**Safe Contributions!** 💸
