import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import {RiExpandUpDownLine} from "react-icons/ri";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

const Paginate = (props) => {

  const {currentPage, recordsPerPage, currentTasks, selectedTasks} = props
  const totalPages = Math.ceil(currentTasks.length / recordsPerPage);
  const noOfRowsPerPage = [10, 20, 30, 40, 50]

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex-1  p-2 self-center text-sm text-muted-foreground">{selectedTasks.length} of {currentTasks.length} row(s)
        selected.
      </div>

      <div className="flex flex-row justify-around p-2">
        <div className="flex items-center space-x-2"><p className="text-sm font-medium">Rows per page</p>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-2 pr-2 pl-2 h-8" variant="outline"><span
                  className="pr-3">{recordsPerPage}</span><RiExpandUpDownLine
                  className="inline-block text-muted-foreground"/> </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="pr-2 w-56">
                {noOfRowsPerPage.map(row =>
                  <DropdownMenuItem key={row} onClick={() => props.updateNoofRows(row)}
                                    value={row}>{row}</DropdownMenuItem>
                )}

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex flex-row items-center mr-2 ml-3">
          <Button variant="outline" className="hidden h-8 w-8 p-2 lg:flex" onClick={props.startingPage}
                  disabled={currentPage === 1}>
            <DoubleArrowLeftIcon size={20} className="h-4 w-4"/></Button>
          <Button variant="outline" className="p-2 h-8 w-8 mr-2 ml-2" onClick={props.prevPage}
                  disabled={currentPage === 1}>
            <MdKeyboardArrowLeft size={20} className="h-4 w-4"/></Button>
          <Button variant="outline" className="p-2 mr-2 h-8 w-8" onClick={props.nextPage}
                  disabled={currentPage === totalPages}>
            <MdKeyboardArrowRight size={20} className="h-4 w-4"/></Button>
          <Button variant="outline" onClick={props.lastPage}
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={currentPage === totalPages}>
            <DoubleArrowRightIcon size={20} className="h-4 w-4"/></Button>
        </div>
      </div>
    </div>
  );
}

export default Paginate
