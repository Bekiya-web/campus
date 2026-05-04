import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, EyeOff, Shield, Smartphone, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { changePassword, enrollMFA, verifyMFA, unenrollMFA, listMFAFactors } from "@/services/authService";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SecuritySettings() {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorState, setTwoFactorState] = useState({
    isEnabled: false,
    isEnrolling: false,
    qrCode: "",
    secret: "",
    verificationCode: "",
  });

  const handleChangePassword = async () => {
    if (!security.newPassword || !security.confirmPassword) {
      toast.error("Please fill in all password fields!");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (security.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    
    setSaving(true);
    try {
      await changePassword(security.newPassword);
      toast.success("Password changed successfully!");
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const err = error as { message?: string };
      console.error("Password change error:", err);
      toast.error(err.message || "Failed to change password. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEnableMFA = async () => {
    setSaving(true);
    try {
      const { totp } = await enrollMFA();
      setTwoFactorState({
        ...twoFactorState,
        isEnrolling: true,
        qrCode: totp.qr_code,
        secret: totp.secret,
      });
      toast.success("Scan the QR code with your authenticator app");
    } catch (error) {
      const err = error as { message?: string };
      console.error("MFA enrollment error:", err);
      toast.error(err.message || "Failed to enable 2FA. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (!twoFactorState.verificationCode || twoFactorState.verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setSaving(true);
    try {
      const factors = await listMFAFactors();
      const factor = factors.totp?.[0];
      
      if (!factor) {
        throw new Error("No MFA factor found");
      }

      await verifyMFA(factor.id, twoFactorState.verificationCode);
      
      setTwoFactorState({
        isEnabled: true,
        isEnrolling: false,
        qrCode: "",
        secret: "",
        verificationCode: "",
      });
      
      toast.success("Two-Factor Authentication enabled successfully!");
    } catch (error) {
      const err = error as { message?: string };
      console.error("MFA verification error:", err);
      toast.error(err.message || "Invalid code. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDisableMFA = async () => {
    setSaving(true);
    try {
      const factors = await listMFAFactors();
      const factor = factors.totp?.[0];
      
      if (factor) {
        await unenrollMFA(factor.id);
        setTwoFactorState({
          isEnabled: false,
          isEnrolling: false,
          qrCode: "",
          secret: "",
          verificationCode: "",
        });
        toast.success("Two-Factor Authentication disabled");
      }
    } catch (error) {
      const err = error as { message?: string };
      console.error("MFA disable error:", err);
      toast.error(err.message || "Failed to disable 2FA. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Check if 2FA is already enabled on component mount
  useEffect(() => {
    listMFAFactors().then((factors) => {
      if (factors.totp && factors.totp.length > 0) {
        setTwoFactorState(prev => ({ ...prev, isEnabled: true }));
      }
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">{t.settings.securitySettings}</h2>
        <p className="text-sm text-muted-foreground">
          {t.settings.managePassword}
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={security.newPassword}
              onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={security.confirmPassword}
              onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
            />
          </div>

          <Button onClick={handleChangePassword} disabled={saving} className="w-full sm:w-auto">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Changing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </>
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">{t.settings.twoFactorAuth}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.settings.addExtraSecurity}
        </p>

        {!twoFactorState.isEnabled && !twoFactorState.isEnrolling && (
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={handleEnableMFA}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Setting up...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Enable 2FA
              </>
            )}
          </Button>
        )}

        {twoFactorState.isEnrolling && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Step 1: Scan QR Code
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator
              </p>
              {twoFactorState.qrCode && (
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={twoFactorState.qrCode} alt="2FA QR Code" className="w-48 h-48" />
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Or enter this code manually:</h4>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-white dark:bg-gray-900 border rounded font-mono text-sm">
                  {twoFactorState.secret}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(twoFactorState.secret)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="verification-code">Step 2: Enter Verification Code</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="verification-code"
                  placeholder="000000"
                  maxLength={6}
                  value={twoFactorState.verificationCode}
                  onChange={(e) => setTwoFactorState({ 
                    ...twoFactorState, 
                    verificationCode: e.target.value.replace(/\D/g, '') 
                  })}
                  className="font-mono text-lg tracking-widest text-center"
                />
                <Button 
                  onClick={handleVerifyMFA}
                  disabled={saving || twoFactorState.verificationCode.length !== 6}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTwoFactorState({
                isEnabled: false,
                isEnrolling: false,
                qrCode: "",
                secret: "",
                verificationCode: "",
              })}
            >
              Cancel
            </Button>
          </div>
        )}

        {twoFactorState.isEnabled && !twoFactorState.isEnrolling && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">2FA is enabled</p>
                <p className="text-sm text-green-700 dark:text-green-300">Your account is protected with two-factor authentication</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDisableMFA}
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Disabling...
                </>
              ) : (
                "Disable 2FA"
              )}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">{t.settings.activeSessions}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.settings.manageSessions}
        </p>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg dark:border-slate-700">
            <div className="flex-1">
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-muted-foreground">Chrome on Windows • Active now</p>
            </div>
            <Badge>Current</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
