import Image from "next/image";
import { ShoppingBag, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-white text-4xl pb-5">Hi ! { user.fullName }</h1>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Welcome to StyleHub
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400">
                  Discover the latest trends and elevate your style with our
                  premium collection.
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white hover:cursor-pointer"
                    >
                      Sign In To Shop Now!
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link href="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white hover:cursor-pointer"
                    >
                      Shop Now!
                    </Button>
                  </Link>
                </SignedIn>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
                >
                  View Collections
                </Button>
              </div>
            </div>
            <Image
              src="https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
              width={550}
              height={550}
              alt="Hero Image"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm dark:bg-gray-800">
                <div className="flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4 text-purple-500" />
                  <span className="text-purple-500">Trending Now</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our most popular items, hand-picked for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden bg-gray-800 dark:bg-gray-800/50 border-gray-700"
              >
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={350}
                    height={250}
                    alt={`Product ${i}`}
                    className="object-cover w-full h-[250px]"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-white">
                      Premium Product {i}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="ml-1 text-sm text-gray-300">4.9</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    High-quality materials, designed for comfort and style.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-white">
                      ${(59 + i * 10).toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 dark:from-purple-950 dark:via-purple-900 dark:to-purple-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Join Our VIP List
              </h2>
              <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                Get exclusive offers, early access to new collections, and
                personalized recommendations.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            {[
              {
                icon: <ShoppingBag className="h-10 w-10 text-purple-500" />,
                title: "Free Shipping",
              },
              {
                icon: <Zap className="h-10 w-10 text-purple-500" />,
                title: "Fast Delivery",
              },
              {
                icon: <Star className="h-10 w-10 text-purple-500" />,
                title: "Premium Quality",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-2 text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  We&apos;re committed to providing the best shopping experience
                  for our customers.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
