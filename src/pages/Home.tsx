import Button from "../components/ui/Button";
import { Card } from "../components/ui/LegacyCard";
import Table from "../components/ui/Table";

const columns = ["Name", "Age", "City"];

const users = [
  { Name: "Abdulrahim", Age: 22, City: "Zagazig" },
  { Name: "Ahmed", Age: 23, City: "Cairo" },
  { Name: "Mohamed", Age: 21, City: "Alexandria" },
];

function Home() {
  return (
    <main className="home">
      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold text-red-600">
          Buttons
        </h2>

        <div className="button-group">
          <Button
            text="Save"
            onClick={() => console.log("Saved")}
            variant="primary"
          />

          <Button
            text="Delete"
            onClick={() => console.log("Deleted")}
            variant="danger"
          />

          <Button
            text="Cancel"
            onClick={() => console.log("Cancelled")}
            variant="secondary"
            disabled
          />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2>Cards</h2>

        <div className="card-grid">
          <Card
            title="React Course"
            description="Learn React and build modern applications."
          >
            <Button
              text="Learn More"
              onClick={() => console.log("Learn More")}
              variant="primary"
            />
          </Card>

          <Card
            title="TypeScript Course"
            description="Learn TypeScript for scalable React applications."
            image="https://via.placeholder.com/400x200"
          >
            <Button
              text="View Course"
              onClick={() => console.log("View Course")}
              variant="secondary"
            />
          </Card>
        </div>
      </section>

      {/* Table */}
      <section>
        <h2>Users</h2>

        <Table
          columns={columns}
          data={users}
          striped
        />
      </section>
    </main>
  );
}

export default Home;