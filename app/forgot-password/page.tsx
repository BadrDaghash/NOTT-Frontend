'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { forgotPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await forgotPassword(email)
      if (success) {
        setIsSuccess(true)
      } else {
        setError('Failed to send reset email. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="text-2xl font-serif tracking-[0.2em] text-foreground block mb-8">
          NOTT
        </Link>

        {isSuccess ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif text-foreground mb-4">Check Your Email</h2>
            <p className="text-muted-foreground mb-8">
              {"We've sent a password reset link to"} <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>
            <Button
              onClick={() => router.push('/reset-password')}
              className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90"
            >
              Enter Reset Code
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsSuccess(false)
                setEmail('')
              }}
              className="w-full mt-4"
            >
              Try a different email
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-foreground">Forgot Password?</h2>
              <p className="text-muted-foreground mt-2">
                {"No worries, we'll send you reset instructions."}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </>
        )}
      </motion.div>
    </div>
  )
}
