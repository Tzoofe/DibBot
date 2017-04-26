const settings = require('./settings.json');
const punishedRole = settings.punishedRole;

module.exports = {
    punish: function(guild, user) {
        if (user == null) {
            guild.addRole(punishedRole);
            return;
        }
        guild.member(user).addRole(punishedRole);
    },
    unpunish: function(guild, user) {
        if (user == null) {
            guild.removeRole(punishedRole);
            return;
        }
        guild.member(user).removeRole(punishedRole);
    }
}