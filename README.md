# **The Ultimate Discord Bot for Seamless Subscription Management with Stripe!**

StripeCord is a simple, free solution to seamlessly integrate Stripe and Discord. It connects directly to the Stripe API, with no extra fees involved. Your customers just enter the email they used for their Stripe subscription through a Discord command and get instant access.

## ✨ Features

- 🔗 **Self-service linking**: members link their Stripe email via a slash command or a one-click button.
- ⚡ **Instant webhook sync**: roles update the moment a subscription is created, renewed, canceled, or fails to pay.
- 🛡️ **Cron safe guard**: keep the classic periodic full-database check running alongside webhooks (or on its own).
- 🎭 **Multi-plan roles**: map each Stripe price/plan to its own Discord role, or run in single-role legacy mode.
- 🧹 **Self-healing**: safety check removes roles from unauthorized holders; inactivity check prunes stale entries.
- 🗄️ **MongoDB-backed**: connects directly to the Stripe API, no middleman, no extra fees.


**Safe Contributions!** 💸

---

## StripeCord v3 is now available!

StripeCord v3 introduces **Stripe webhooks** for instant role updates: instead of waiting for the periodic cron check, roles are synced the moment a subscription changes on Stripe, faster for your members and far fewer API requests. The legacy cron check is still available and can run alongside webhooks as a safe guard.

If anyone would like to help, I would be grateful if you could make PRs or create a issue for enhancement features or bugs found. Any [Ko-Fis](https://ko-fi.com/rodaviva) given would be greatly welcome to allow me to continue to mantain this project development.


## 🤝 Sponsor [Subscord](https://subscord.com/?ref=stripecord)

StripeCord is an open-source Discord bot that lets you sell memberships and roles using **Stripe**. While the bot is free and open-source, hosting, configuring, and managing subscriptions can be challenging for beginners. Since I receive a lot of questions that I can’t always answer individually, I recommend using [Subscord](https://subscord.com/?ref=stripecord) — a full-featured service that lets you turn your community into a paid one in just a few clicks, with low fees and automated role management.

## Wiki / Documentation

Please check the [Wiki / Docs](https://github.com/Rodaviva29/StripeCord/wiki) to get started with this project and to see all the awesome features.

⭐ **Cloud Hosted Free configuration available** within minutes and Self Hosted configuration for the geeks.

---

We hope you enjoy using Stripe Cord. If you have any questions or issues, feel free to contact me on Discord (prefereble) or via chat in https://chung-jf.me. My Discord nickname is `Rodaviva`.

