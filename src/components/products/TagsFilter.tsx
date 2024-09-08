import { Select, SelectItem } from "@nextui-org/select";

interface TagsFilterProps {
  tags: { id: number; name: string }[];
  selectedTags: number[];
  setSelectedTags: (tags: number[]) => void;
}

const TagsFilter = ({ tags, selectedTags, setSelectedTags }: TagsFilterProps) => {
  const handleTagChange = (value: string | number) => {
    const tagId = Number(value);
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <Select
      label="Filter by Tags"
      multiple
      selectedKeys={selectedTags}
      // TODO: Issues with this method
      onSelectionChange={() => handleTagChange}
    >
      {tags.map((tag) => (
        <SelectItem key={tag.id} value={tag.id}>
          {tag.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default TagsFilter;
