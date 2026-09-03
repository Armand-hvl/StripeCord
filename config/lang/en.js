/**
 * English language file for StripeCord
 */

module.exports = {
    commands: {
        admin: {
            button: {
                slashCommandDescription: "Poste le message d'inscription (paiement / liaison / gestion).",
                embedTitle: `${process.env.SUBSCRIPTION_NAME} - Rejoindre`,
                embedDescription: "Paie ton abonnement puis clique sur le bouton pour lier ton compte Stripe à ton compte Discord.\n\nCela te donnera accès au contenu réservé aux membres.",
                embedFooter: "Tu peux aussi utiliser la commande /link directement avec ton email.",
                embedAuthor: {
                    name: "Abonnement | Infos",
                    iconURL: "https://cdn-icons-png.flaticon.com/512/3858/3858448.png"
                },
                buttonPayLabel: "Payer mon abonnement",
                buttonLinkLabel: "Lier mon compte",
                buttonPortalLabel: "Gérer mon abonnement",
                slashCommandInteraction: "C'est fait, le message a été envoyé !"
            },
            link: {
                slashCommandDescription: "Link your Stripe account email with your Discord account.",
                slashCommandUserOption: "Force link a member to a certain email.",
                slashCommandStringOption: "Enter customer's Stripe Account email.",
                embedEmailRegexDescription: "Hey **{username}**, email address typed is **not valid**. Please make sure you are typing it correctly and execute this command again.",
                embedExistingEmailCustomerDescription: "The email address provided is **already in use** by another member. Use another e-mail or check your Database if you think this is an error.",
                embedSameEmailDescription: "The email provided is **already in use** by the customer himself ({customer_tag}). Use another e-mail or check your Database if you think this is an error.",
                embedWaitMessageDescription: "We're checking {customer_tag} account status for more information.",
                embedWaitMessageFooter: 'Hold on tight. This may take a few seconds.',
                embedNoActiveSubscriptionDescription: "It seems the **customer don't have an active subscription**. Double Check Stripe Admin Panel if you think this is an error. ({email})",
                logsAssignedRolesMap: "Roles assigned: {assigned_roles}",
                logsNoAssignedRolesMap: 'No roles assigned',
                logsLinkedAccount: ":asterisk: **ADMIN:** **{admin_tag}** ({admin_id}, <@{admin_id}>) linked **{customer_tag}** ({member_id}, <@{member_id}>) with: \`{customer_email}\`.\n{roles_text}",
                embedAccessGrantedDescription: ":white_check_mark: | Woohoo! **{member_tag}** account has been **linked successfully** with {email}.\nNow the customer Discord privileges are automatically renewed.\n\n{roles_text}",
            },
            status: {
                slashCommandDescription: "Verify your Stripe Account Status.",
                slashCommandUserOption: "Search for a member.",
                embedNoDiscordCustomerDescription: ":x: | There is no **Stripe Account** associated with {usertag} account.",
                authorNameAccess: "{user_tag}' Access",
                embedFooter: "This account is associated with {email}.",
                subscriptionsFieldName: `All Subscriptions from ${process.env.SUBSCRIPTION_NAME}`,
                noSubscriptionsMessage: "There are no subscriptions for this customer.",
                renewalCancelledStatus: "❌ Renewal Cancelled (yet to be expired)",
                renewalActiveStatus: "✅ Renewal Active",
                renewalStatusText: "Status:",
                renewalDateLabel: "Renewal Date:"
            }
        },
        dev: {
            delete: {
                slashCommandDescription: 'Admin command to remove a user from the database.',
                slashCommandUserOption: 'Choose the user you want to remove from the database.',
                userNotInServer: '❌ | {user_tag} ({user_id}) __it\'s not in Discord Server__, please remove the data directly from the DB!',
                userNotInDatabase: '❌ | {user_tag} ({user_id}) __it\'s not in the database__!',
                accountFoundAuthor: 'Account found: {user_tag}',
                accountFoundDescription: '> Member: **{user_tag}** ({user_id}, <@{user_id}>)\n> Email: `{email}`.',
                confirmationFooter: 'Are you sure you want to remove this user from the database?',
                confirmButtonLabel: 'Confirm Drop',
                cancelButtonLabel: 'Cancel',
                successMessage: 'The account of **{user_tag}** ({user_id}, <@{user_id}>) with the e-mail address: `{email}` was **successfully dropped**!',
                logsMessage: ':asterisk: **ADMIN:** **{admin_tag}** ({admin_id}, <@{admin_id}>) deleted **{user_tag}** ({user_id}, <@{user_id}>) Account with the e-mail address: `{email}`.',
                cancelMessage:  'The action regarding the __{email}__ was **cancelled**!',
                timeoutMessage: 'The request for confirmation of deletion of __{email}__ **expired**.',
                errorMessage: 'An error was logged when executing this command.',
            },
            inactivity: {
                slashCommandDescription: 'Remove inactive users from the database.',
                slashCommandDaysOption: 'Number of days of inactivity before removing users.',
                processingMessage: '🔄 | Running inactivity check for users inactive for more than **{days} days**...',
                successMessage: '✅ | Inactivity check completed! Users inactive for more than **{days} days** have been removed from the database.',
                errorMessage: '❌ | An error occurred while running the inactivity check.'
            },
            sync: {
                slashCommandDescription: 'Manually trigger the daily check.',
                successMessage: '🔄 | Stripe check **triggered**!\n\n⚠️ Please don\'t use this command more than __once an hour or two__.'
            }
        },
        stripe: {
            link: {
                slashCommandDescription: "Link your Stripe Account E-mail with your Discord Account.",
                slashCommandEmailOption: "Enter your Stripe Account E-mail.",
                embedEmailAssociatedDescription: "Hey **{username}**, you already have an e-mail associated with Discord.\n\n> Current e-mail associated: **{email}**.\n\nIf you want to change your e-mail address, just enter your new e-mail.",
                embedNoEmailDescription: `> Hey **{username}**, you can buy a subscription plan within this link: ${process.env.STRIPE_PAYMENT_LINK}.\n\nIf you already use Stripe as your payment method, try to execute this command again with an e-mail address to get access to auto renewal permissions.`,
                embedEmailRegexDescription: "Hey **{username}**, e-mail address typed is **not valid**. Please make sure you are typing it correctly and execute this command again.",
                embedExistingEmailCustomerDescription: "The e-mail address provided is **already in use** by another member. Use another e-mail or contact our team if you think this is an error.",
                embedWaitMessageDescription: "We're checking your account status for more information.",
                embedWaitMessageFooter: "Hold on tight. This may take a few seconds.",
                embedNoActiveSubscriptionDescription: `It seems **you don't have an active subscription**. Subscribe through the following link: ${process.env.STRIPE_PAYMENT_LINK} to get started.`,
                logsAssignedRolesMap: "Roles assigned: {assigned_roles}",
                logsNoAssignedRolesMap: "No roles assigned",
                logsResyncAccount: ":repeat: **{member_tag}** ({member_id}, <@{member_id}>) used link to resync their account with: `{customer_email}`.\n{roles_text}",
                logsLinkedAccount: ":link: **{member_tag}** ({member_id}, <@{member_id}>) linked their account with: `{customer_email}`.\n{roles_text}",
                embedAccessGrantedDescription: "Ton accès est débloqué, voici comment démarrer :\n\n🎓 Découvre tes mentors dans BUT → écoles d'ingé ou GEI-UNIV selon ta filière\n🎥 Le prochain live est annoncé dans #lives-et-replays\n🏆 Un classement mensuel récompense les membres les plus actifs — jusqu'au mois remboursé pour le premier ! Direction #classement-du-mois pour voir comment ça marche\n\nOn est ravis de t'avoir parmi nous 💜",
                embedAccessGrantedTitle: "🎉 Bienvenue dans la communauté ARWAY !",
                publicWelcomeMessage: "🎉 Bienvenue {member} parmi les membres ARWAY ! N'hésite pas à te présenter ici et à poser tes premières questions aux mentors.",
            },
            unlink: {
                slashCommandDescription: "Unlink your Stripe Account from your Discord Account and remove all roles.",
                noAccountLinked: "Hey **{username}**, you don't have an account linked with us. There's nothing to unlink.",
                accountFoundAuthor: "Account found: {user_tag}",
                accountFoundDescription: "> Member: **{user_tag}** ({user_id}, <@{user_id}>)\n> Email: `{email}`.",
                confirmationFooter: "Are you sure you want to unlink your account and remove all roles?",
                confirmButtonLabel: "Confirm Unlink",
                cancelButtonLabel: "Cancel",
                successMessage: "Your account with email `{email}` has been successfully unlinked and all roles have been removed.",
                cancelMessage: "The unlinking of your account was cancelled.",
                timeoutMessage: "The request to unlink your account has expired.",
                errorMessage: "An error occurred while processing your request.",
                logsMessage: ":outbox_tray: **{user_tag}** ({user_id}, <@{user_id}>) unlinked their account and removed all roles. Email: `{email}`."
            }
        }
    },
    functions: {
        inactivityCheck: {
            logRemovedUser: ':wastebasket: Removed **{user_id}** ({user_mention}) after {days} days of inactivity. Email: `{email}`.',
            logTotalRemoved: 'Removed **{count}** inactive users.'
        },
        permsCheck: {
            expiredEmbedTitle: "Your automatic contribution has expired!",
            expiredEmbedTitleMultiple: "One of your automatic contribution has expired!",
            expiredEmbedDescription: `Please visit ${process.env.STRIPE_PAYMENT_LINK} to maintain your {role_name} benefits.`,
            logLostPrivileges: ":arrow_lower_right: **{user_tag}** ({user_id}, <@{user_id}>) lost privileges. Email: `{email}`.",
            logCustomerNotInGuild: ":outbox_tray: Customer with email `{email}` (ID: {user_id}, <@{user_id}>) was removed from the database because they left the server.",
            logAccessRestored: ":repeat: **{user_tag}** ({user_id}, <@{user_id}>) had accesses added again. Email: `{email}`.",
            logNewRolesReceived: ":inbox_tray: **{user_tag}** ({user_id}, <@{user_id}>) received new roles: {roles_list}. Email: `{email}`.",
            userNotificationTitle: "Not in use, uncomment in permsCheck.js file - New roles assigned!",
            userNotificationDescription: "Not in use, uncomment in permsCheck.js file - You've been assigned the following roles: {roles_list}.",
            userNotificationFooter: "Not in use, uncomment in permsCheck.js file - Thank you for your subscription!",
            logPlanExpired: ":arrow_lower_right: **{user_tag}** ({user_id}, <@{user_id}>) lost privileges for plan {plan_id}, role <@&{role_id}>. Customer e-mail: `{email}`.",
            logUntrackPlanRemoved: ":arrow_lower_right: **{user_tag}** ({user_id}, <@{user_id}>) lost privileges for untracked plan {plan_id}, role <@&{role_id}>. Customer e-mail: `{email}`."
        },
        safetyCheck: {
            logRemovedUser: ':shield: Removed unauthorized roles from **{user_tag}** ({user_id}, {user_mention}). User not found in database.',
            logSummary: 'Safety Check: Removed roles from **{count}** unauthorized users.',
            logNoUnauthorized: ':white_check_mark: Safety Check completed. No unauthorized role holders found.'
        },
        webhook: {
            logEventReceived: ':zap: Stripe webhook `{event_type}` received for `{email}`. Syncing roles.'
        },
    },
    interactions: {
        stripe_email_modal: {
            embedEmailRegexDescription: "Hey **{username}**, e-mail address typed is **not valid**. Please make sure you are typing it correctly and try again.",
            embedExistingEmailCustomerDescription: "The e-mail address provided is **already in use** by another member. Use another e-mail or contact our team if you think this is an error.",
            embedSameEmailDescription: "The e-mail provided is **already in use** by yourself. Use another e-mail or contact our team if you think this is an error.",
            embedWaitMessageDescription: "We're checking your account status for more information.",
            embedWaitMessageFooter: "Hold on tight. This may take a few seconds.",
            embedNoActiveSubscriptionDescription: `It seems **you don't have an active subscription**. Subscribe through the following link: ${process.env.STRIPE_PAYMENT_LINK} to get started.`,
            logsAssignedRolesMap: "Roles assigned: {assigned_roles}",
            logsNoAssignedRolesMap: "No roles assigned",
            logsResyncAccount: ":repeat: **{member_tag}** ({member_id}, <@{member_id}>) used link to resync their account with: `{customer_email}`. {roles_text}",
            logsLinkedAccount: ":link: **{member_tag}** ({member_id}, <@{member_id}>) linked their account with: `{customer_email}`. {roles_text}",
            embedAccessGrantedDescription: "Ton accès est débloqué, voici comment démarrer :\n\n🎓 Découvre tes mentors dans BUT → écoles d'ingé ou GEI-UNIV selon ta filière\n🎥 Le prochain live est annoncé dans #lives-et-replays\n🏆 Un classement mensuel récompense les membres les plus actifs — jusqu'au mois remboursé pour le premier ! Direction #classement-du-mois pour voir comment ça marche\n\nOn est ravis de t'avoir parmi nous 💜",
            embedAccessGrantedThumbnail: "https://cdn-icons-png.flaticon.com/512/3858/3858448.png",
            embedAccessGrantedTitle: "Access's Granted"
        },
        stripe_link_button: {
            modalTitle: "Lier ton compte",
            emailInputLabel: "Email utilisé pour payer",
            emailInputPlaceholder: "ton.email@exemple.com"
        }
    },
        events : {
        interactionCreate: {
            cooldownInteraction: "Please wait, you are on a cooldown for {commandName}. You can use it again {expiredTimestamp}.",
            errorCommand: "There was an error while executing this command!",
            errorInteraction: "There was an error while processing your interaction!"
        },
        guildMemberAdd: {
            embedTitle: "Bienvenue chez ARWAY 👋",
            embedDescription: "ARWAY t'accompagne pour réussir ton passage en école d'ingénieur (BUT → écoles d'ingé, GEI-UNIV).\n\nJette un œil au règlement, puis rejoins la communauté payante pour débloquer l'accès aux mentors et à l'entraide.\n\n💬 Une question avant de te lancer ? On est là.",
            embedFooter: "L'équipe ARWAY",
            buttonRulesLabel: "📜 Lire le règlement",
            buttonJoinLabel: "💳 Rejoindre la communauté"
        }
    }
};
