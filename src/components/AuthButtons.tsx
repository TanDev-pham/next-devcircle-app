// src/components/AuthButtons.tsx
'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {session.user?.image && (
          <Image 
            src={session.user.image} 
            alt={session.user.name || "User avatar"} 
            width={32} 
            height={32} 
            style={{ borderRadius: '50%' }}
          />
        )}
        <span>Signed in as {session.user?.name}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      <span>Not signed in</span>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </>
  );
}