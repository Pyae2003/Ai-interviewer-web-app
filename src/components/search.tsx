import { Search } from "lucide-react"
import { Card , CardContent } from "./ui/card"
import { Input } from "./ui/input"

type searchProp = {
    placeholder : string
}
const SearchInput = ({placeholder} : searchProp) => {
  return (
    <div>
    <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input placeholder={placeholder} className="pl-9" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchInput