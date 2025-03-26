import Link from 'next/link';

export default function MeetTheTeam() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Page Title */}
        <section className="mb-8">
          <div className="py-4 px-4 text-4xl font-bold text-center mb-4">Meet The Team</div>
        </section>

        {/* Co-founders */}
        <section className="justify-center mb-8">
          <h2 className="text-2xl text-center font-semibold mb-4">Co-founders</h2>
          <div className="flex space-x-8">
            <div>
              <h3 className="text-xl text-center font-bold">Nikhil Narkhedkar</h3>
              <p>(CEO)</p>
            </div>
            <div>
              <h3 className="text-xl text-center font-bold">Omkar Jadhav</h3>
            </div>
          </div>
        </section>

        {/* Meet the Squad */}
        <section className="py-4 px-4 justify-center mb-8">
          <h2 className="text-2xl text-center font-semibold mb-4">Meet the Squad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Arnav Limaye</h3>
              <p>Engineering</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Sheetal Datir</h3>
              <p>Engineering</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Ravinder Singh</h3>
              <p>Engineering</p>
            </div><div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Akhilesh Patidar</h3>
              <p>Engineering</p>
            </div><div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Nirmal Kumar</h3>
              <p>Engineering</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Saurabh Pharate</h3>
              <p>Engineering</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Neeraj Singh</h3>
              <p>Engineering</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Khushi Pawar</h3>
              <p>Product</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Rishabh Shetty</h3>
              <p>UI UX & Design</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="text-xl font-bold">Sahil Panda</h3>
              <p>Product & Design</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}